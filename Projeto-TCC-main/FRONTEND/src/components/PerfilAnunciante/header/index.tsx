import React from 'react';
import { View, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  nome: string;
  ultimoAcesso?: string;
  desde?: string;
  cidade?: string;
  foto?: string;
}

export function HeaderPerfil({ nome, ultimoAcesso = '10 min', desde = '2020', cidade = 'Cidade não informada', foto }: Props) {
  return (
    <View className="bg-white mt-4 p-4 rounded-2xl shadow">
      <View className="flex-row items-center">
        <Image
          source={{ uri: foto || 'https://i.imgur.com/hNJGtug.jpeg' }}
          className="w-20 h-20 rounded-full"
        />
        <View className="ml-4">
          <Text className="text-xl font-bold">{nome}</Text>
          <Text className="text-sm text-gray-600">Último acesso há {ultimoAcesso}</Text>
        </View>
      </View>

      <View className="flex-row items-center mt-4 space-x-2">
        <Ionicons name="calendar-outline" size={18} color="gray" />
        <Text className="text-gray-600">Membro desde {desde}</Text>
      </View>

      <View className="flex-row items-center mt-2 space-x-2">
        <Ionicons name="location-outline" size={18} color="gray" />
        <Text className="text-gray-600">{cidade}</Text>
      </View>
    </View>
  );
}
