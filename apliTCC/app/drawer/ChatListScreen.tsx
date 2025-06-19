import React, { useState } from 'react';
import { View } from 'react-native';
import ChatList from '../../src/components/chat/ChatList';
import { useRouter } from 'expo-router';
import { DrawerButton } from '../../src/components/drawer';

const ChatListScreen = () => {
  const router = useRouter();

  const [chats, setChats] = useState([
    {
      chatId: '1',
      name: 'João Silva',
      avatar: 'https://i.pravatar.cc/150?img=1',
      lastMessage: 'Olá, tudo bem?',
      timestamp: new Date().toISOString(),
    },
    {
      chatId: '2',
      name: 'Maria Souza',
      avatar: 'https://i.pravatar.cc/150?img=2',
      lastMessage: 'Vamos conversar depois!',
      timestamp: new Date().toISOString(),
    },
    {
      chatId: '3',
      name: 'Pedro Henrique',
      avatar: 'https://i.pravatar.cc/150?img=3',
      lastMessage: 'Até mais!',
      timestamp: new Date().toISOString(),
    },
    // ➕ Adicione quantos quiser
  ]);

  const handleSelectChat = (chatId: string) => {
    router.push({
      pathname: '/chat/[chatId]',
      params: {
        chatId,
        userId: 'meuUserId',
        receiverId: 'receiverId',
      },
    });
  };

  return (


    <View className="flex-1 bg-slate-200">
        <DrawerButton/>
        <View>
            <ChatList chats={chats} onSelectChat={handleSelectChat} />
        </View>

    </View>
  );
};

export default ChatListScreen;
