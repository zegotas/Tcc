import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface Notificacao {
  id: string;
  titulo: string;
  corpo: string;
  data: string;
}

export default function NotificationsScreen() {
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);

  
  useFocusEffect(
    React.useCallback(() => {
      carregarNotificacoes();
    }, [])
  );

  async function carregarNotificacoes() {
    try {
      const data = await AsyncStorage.getItem('notificacoes');
      const lista = data ? JSON.parse(data) : [];
      setNotificacoes(lista);
    } catch (e) {
      console.log('Erro ao carregar notificações', e);
    }
  }

  async function limparTodas() {
    Alert.alert(
      'Limpar notificações',
      'Tem certeza que deseja apagar todas as notificações?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Apagar',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.removeItem('notificacoes');
            setNotificacoes([]);
          },
        },
      ]
    );
  }

  const renderItem = ({ item }: { item: Notificacao }) => (
    <View className="bg-white rounded-xl p-4 mb-3 shadow">
      <Text className="text-lg font-semibold">{item.titulo}</Text>
      <Text className="text-gray-700 mt-1">{item.corpo}</Text>
      <Text className="text-xs text-gray-500 mt-2">{new Date(item.data).toLocaleString()}</Text>
    </View>
  );

  return (
    <View className="flex-1 bg-slate-100 px-4 pt-6">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-2xl font-bold">Notificações</Text>
        {notificacoes.length > 0 && (
          <TouchableOpacity onPress={limparTodas}>
            <Ionicons name="trash-outline" size={24} color="#dc2626" />
          </TouchableOpacity>
        )}
      </View>

      {notificacoes.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500">Nenhuma notificação recebida ainda.</Text>
        </View>
      ) : (
        <FlatList
          data={notificacoes}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
