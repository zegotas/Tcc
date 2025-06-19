import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import io from 'socket.io-client';
import { useLocalSearchParams } from 'expo-router';
import MessageBubble from './MessageBubble';
import InputBar from './InputBar';

const socket = io('http://192.168.0.7:3000');

interface Message {
  _id: string;
  chatId: string;
  senderId: string;
  text?: string;
  image?: string;
  timestamp: string;
}

export default function ChatScreen() {
  const { chatId, userId, receiverId } = useLocalSearchParams();

  const chatIdSafe = chatId as string;
  const userIdSafe = userId as string;
  const receiverIdSafe = receiverId as string;

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.emit('join', userIdSafe);

    socket.on('newMessage', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on('messageSent', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = (text?: string, image?: string) => {
    socket.emit('sendMessage', {
      chatId: chatIdSafe,
      senderId: userIdSafe,
      receiverId: receiverIdSafe,
      text,
      image,
    });
  };

  const handleSend = (text: string) => {
    sendMessage(text);
  };

  const handleSendImage = async (uri: string) => {
    const formData = new FormData();
    formData.append('image', {
      uri,
      name: 'photo.jpg',
      type: 'image/jpg',
    } as any);

    const res = await fetch('http://192.168.0.7:3000/upload', {
      method: 'POST',
      body: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    const data = await res.json();
    if (data?.imageUrl) {
      sendMessage(undefined, data.imageUrl);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={messages}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <MessageBubble
            isSender={item.senderId === userIdSafe}
            text={item.text ?? ''}
            image={item.image}
            timestamp={item.timestamp}
          />
        )}
        className="px-4"
        contentContainerStyle={{ paddingVertical: 8 }}
      />
      <InputBar onSend={handleSend} onSendImage={handleSendImage} />
    </View>
  );
}
