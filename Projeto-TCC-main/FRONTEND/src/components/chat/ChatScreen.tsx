import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, FlatList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import MessageBubble from './MessageBubble';
import InputBar from './InputBar';
import { getApiUrl } from '../../global/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import socket from '../../global/socket';

interface Message {
  _id: string;
  chatId: string;
  senderId: string;
  conteudo?: string;
  image?: string;
  timestamp: string;
}

export default function ChatScreen() {
  const { chatId, receiverId } = useLocalSearchParams();
  console.log('[FRONT] Parâmetros do chat:', { chatId, receiverId });

  const chatIdSafe = chatId as string;
  const receiverIdSafe = receiverId as string;
  const [userIdSafe, setUserIdSafe] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    AsyncStorage.getItem('userId').then(id => {
      if (id) setUserIdSafe(id);
    });
  }, []);

  const fetchMessages = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${getApiUrl()}/mensagens/${chatIdSafe}`);
      const data = await res.json();
      setMessages(data);
      setLoading(false);
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (e) {
      setLoading(false);
      console.log('Erro ao buscar mensagens:', e);
    }
  }, [chatIdSafe]);

  useEffect(() => {
    if (chatIdSafe) fetchMessages();
  }, [chatIdSafe, fetchMessages]);

  const handleNewMessage = useCallback((msg: Message) => {
    console.log('[FRONT] Recebeu newMessage:', msg);
    setMessages((prev) => [...prev, msg]);
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, []);

  useEffect(() => {
    if (!userIdSafe || !chatIdSafe) return;

    console.log('[FRONT] Entrando na sala do chat:', chatIdSafe);
    socket.emit('join', chatIdSafe);
    socket.on('newMessage', handleNewMessage);

    return () => {
      console.log('[FRONT] Saindo da sala do chat:', chatIdSafe);
      socket.emit('leave', chatIdSafe);
      socket.off('newMessage', handleNewMessage);
    };
  }, [chatIdSafe, userIdSafe, handleNewMessage]);

  const sendMessage = (text?: string, image?: string) => {
    if (!userIdSafe || !chatIdSafe || !receiverIdSafe) {
      alert('[FRONT] Falta userIdSafe, chatIdSafe ou receiverIdSafe!');
      console.log('[FRONT] Falta userIdSafe, chatIdSafe ou receiverIdSafe!', { userIdSafe, chatIdSafe, receiverIdSafe });
      return;
    }
    console.log('[FRONT] Enviando mensagem:', { chatId: chatIdSafe, senderId: userIdSafe, receiverId: receiverIdSafe, conteudo: text, image });
    socket.emit('sendMessage', {
      chatId: chatIdSafe,
      senderId: userIdSafe,
      receiverId: receiverIdSafe,
      conteudo: text,
      image,
    });

    // 🔥 FORÇAR ATUALIZAÇÃO DA LISTA DE CHATS
    socket.emit('chatUpdated', { chatId: chatIdSafe });
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
    const res = await fetch(`${getApiUrl().replace('/api', '')}/upload`, {
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
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <MessageBubble text="Carregando..." isSender={false} timestamp={''} />
        </View>
      ) : (
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <MessageBubble
              isSender={item.senderId === userIdSafe}
              text={item.conteudo || ''}
              image={item.image}
              timestamp={item.timestamp}
            />
          )}
          className="px-4"
          contentContainerStyle={{ paddingVertical: 8 }}
        />
      )}
      <InputBar onSend={handleSend} onSendImage={handleSendImage} />
    </View>
  );
}
