import React from 'react';
import { View, Text } from 'react-native';
import { Pressable } from 'react-native-gesture-handler';
import { goToChatWithUser } from '@/src/utils/chatHelper';

interface Props {
  userId: string;
  nome: string;
  foto?: string;
}

export function ContatoPerfil({ userId, nome, foto }: Props) {
  return (
    <View className='bg-white mt-4 p-4 rounded-2xl shadow'>
      <Text className="text-xl font-bold mb-3">Contato</Text>
      <Pressable
        onPress={() => goToChatWithUser(userId, nome, foto || 'https://i.imgur.com/hNJGtug.jpeg')}
      >
        <Text className="text-blue-500 text-lg">Entrar em contato</Text>
      </Pressable>
    </View>
  );
}
