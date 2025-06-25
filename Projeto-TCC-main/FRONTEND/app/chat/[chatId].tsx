import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import ChatScreen from '../../src/components/chat/ChatScreen';
import { Voltar } from '@/src/components/voltar';

export default function ChatPage() {
  // Apenas renderiza o ChatScreen real, que já busca mensagens do backend
  return (
    <>
      <Voltar />
      <ChatScreen />
    </>
  );
}
