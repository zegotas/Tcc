import React from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5, Feather } from '@expo/vector-icons';
import { GestureHandlerRootView, Pressable } from 'react-native-gesture-handler';
import { Voltar } from '@/src/components/voltar';
import { router, useLocalSearchParams } from 'expo-router';

export default function PerfilAnunciante() {
  const { anunciante } = useLocalSearchParams();
  const data = JSON.parse(anunciante as string);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} className="bg-slate-200 px-4">

          <Voltar />

          <View className="bg-white mt-4 p-4 rounded-2xl shadow">
            <View className="flex-row items-center">
              <Image
                source={{ uri: 'https://i.imgur.com/hNJGtug.jpeg' }}
                
                className="w-20 h-20 rounded-full"
              />
              <View className="ml-4">
                <Text className="text-xl font-bold">{data.nome}</Text>
                <Text className="text-sm text-gray-600">Último acesso há {data.ultimoAcesso || '10 min'}</Text>
              </View>
            </View>

            <View className="flex-row items-center mt-4 space-x-2">
              <Ionicons name="calendar-outline" size={18} color="gray" />
              <Text className="text-gray-600">Membro desde {data.desde || '2020'}</Text>
            </View>

            <View className="flex-row items-center mt-2 space-x-2">
              <Ionicons name="location-outline" size={18} color="gray" />
              <Text className="text-gray-600">{data.cidade || 'Cidade não informada'}</Text>
            </View>
          </View>

          <View className="bg-white mt-4 p-4 rounded-2xl shadow">
            <Text className="text-xl font-bold mb-3">Verificações</Text>

            <View className="flex-row items-center mb-2">
              <Feather name="mail" size={20} color="green" />
              <Text className="ml-2 text-gray-700">E-mail verificado</Text>
            </View>

            <View className="flex-row items-center mb-2">
              <Feather name="phone" size={20} color="green" />
              <Text className="ml-2 text-gray-700">Telefone verificado</Text>
            </View>
          </View>

          <View className='bg-white mt-4 p-4 rounded-2xl shadow'>
             <Text className="text-xl font-bold mb-3">Contato</Text>
            <Pressable
                onPress={() => alert('Função de contato em desenvolvimento')} 
            >
              <Text className="text-blue-500 text-lg">Entrar em contato</Text>
            </Pressable>
          </View>

          <View className="bg-white mt-4 p-4 rounded-2xl shadow">
            <View className="flex-row items-center mb-3">
              <MaterialIcons name="history" size={20} color="gray" />
              <Text className="ml-2 text-xl font-bold">Histórico</Text>
            </View>

            <Text className="text-gray-600">{data.anuncios || 5} anúncios publicados nos últimos 180 dias</Text>
          </View>

        </ScrollView>


      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
