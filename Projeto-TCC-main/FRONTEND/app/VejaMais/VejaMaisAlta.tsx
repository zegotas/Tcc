import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { CardHorizontalServi } from '../../src/components/AnuncioVejaAlta/servi';
import { ServicoProps } from '../../src/components/AnuncioVejaAlta';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Voltar } from '@/src/components/voltar';

export default function VejaMais() {
  const [servicos, setServicos] = useState<ServicoProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getServicos() {
      try {
        const response = await fetch('http://192.168.0.7:3000/foods');
        const data = await response.json();
        setServicos(data);
      } catch (error) {
        console.error('Erro ao buscar serviços:', error);
      } finally {
        setLoading(false);
      }
    }
    getServicos();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="bg-slate-200 flex-1 px-4 ">
        <Voltar />
        <Text className="text-2xl font-bold mb-4">Serviços mais perto de você</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#6366f1" />
        ) : (
          <FlatList
            data={servicos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <CardHorizontalServi servi={item} />}
            contentContainerStyle={{ gap: 16, paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </GestureHandlerRootView>
  );
}