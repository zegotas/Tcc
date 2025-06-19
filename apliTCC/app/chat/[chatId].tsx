import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import MessageBubble from '../../src/components/chat/MessageBubble';
import InputBar from '../../src/components/chat/InputBar';
import { Voltar } from '@/src/components/voltar';

const ChatScreen = () => {
  const { chatId, userId, receiverId } = useLocalSearchParams();

  const [messages, setMessages] = useState([
    { id: '1', text: 'Olá!', sender: 'receiverId' },
    { id: '2', text: 'Oi, tudo bem?', sender: 'meuUserId' },
    { id: '3', text: 'Tudo sim, e você?', sender: 'receiverId' },
  ]);

  const handleSend = (newMessage: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: String(prev.length + 1),
        text: newMessage,
        sender: 'meuUserId',
      },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-200">
      <Voltar/>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MessageBubble
            text={item.text}
            isSender={item.sender === 'meuUserId'} timestamp={''}          />
        )}
        contentContainerStyle={{ padding: 12 }}
        inverted
      />
      <InputBar onSend={handleSend} onSendImage={function (uri: string): Promise<void> {
        throw new Error('Function not implemented.');
      } } />
    </SafeAreaView>
  );
};

export default ChatScreen;
