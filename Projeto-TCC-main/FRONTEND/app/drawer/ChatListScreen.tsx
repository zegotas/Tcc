import React, { useEffect, useState, useCallback } from 'react';
import { View } from 'react-native';
import ChatList from '../../src/components/chat/ChatList';
import { useRouter, useFocusEffect } from 'expo-router';
import { DrawerButton } from '../../src/components/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApiUrl } from '../../src/global/api';
import socket from '../../src/global/socket'; // ✅ Importando o socket

interface Chat {
  _id: string;
  participantes: { _id: string; nome: string }[];
  ultimaMensagem?: { conteudo: string };
  ultimoUpdate: string;
}

const ChatListScreen = () => {
  const router = useRouter();
  const [chats, setChats] = useState<any[]>([]);

  const fetchChats = useCallback(async () => {
    const userId = await AsyncStorage.getItem('userId');
    if (!userId) return;
    try {
      const res = await fetch(`${getApiUrl()}/chats/${userId}`);
      const data = await res.json();
setChats(
  (data as Chat[]).map((chat: Chat) => {
    const receiver = chat.participantes.find(p => p._id !== userId);
    return {
      chatId: chat._id,
      name: receiver?.nome || 'Usuário',
      avatar: 'https://i.pravatar.cc/150?u=' + chat._id,
      lastMessage: chat.ultimaMensagem?.conteudo || '',
      timestamp: chat.ultimoUpdate,
      receiverId: receiver?._id,  // <<< IMPORTANTE: Adiciona o receiverId
    };
  })
);
    } catch (e) {
      console.log('Erro ao buscar chats:', e);
    }
  }, []);

  useEffect(() => {
    fetchChats();

    // ✅ Escutar atualizações de chats em tempo real
    socket.on('chatUpdated', fetchChats);

    return () => {
      socket.off('chatUpdated', fetchChats);
    };
  }, [fetchChats]);

  useFocusEffect(
    useCallback(() => {
      fetchChats();
    }, [fetchChats])
  );

const handleSelectChat = (chatId: string, receiverId: string) => {
  router.push({
    pathname: '/chat/[chatId]',
    params: { chatId, receiverId },
  });
};

  return (
    <View className="flex-1 bg-slate-200">
      <DrawerButton />
      <View>
        <ChatList chats={chats} onSelectChat={handleSelectChat} />
      </View>
    </View>
  );
};

export default ChatListScreen;
