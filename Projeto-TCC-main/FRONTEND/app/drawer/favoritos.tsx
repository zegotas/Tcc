import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { CardHorizontalServi } from '@/src/components/AnuncioLocal/servi';
import { buscarFavoritos, limparFavoritos } from '@/src/utils/favoritos';
import { ServicoProps } from '../../src/utils/ServicoProps';
import { DrawerButton } from '@/src/components/drawer';


export default function Favoritos() {
  const [favoritos, setFavoritos] = useState<ServicoProps[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function carregarFavoritos() {
      const data = await buscarFavoritos();
      setFavoritos(data);
    }

    if (isFocused) {
      carregarFavoritos();
    }
  }, [isFocused]);

  async function handleLimparFavoritos() {
    Alert.alert(
      'Limpar favoritos',
      'Tem certeza que deseja remover todos os favoritos?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sim, limpar',
          style: 'destructive',
          onPress: async () => {
            await limparFavoritos();
            setFavoritos([]);
          },
        },
      ]
    );
  }

  return (
    <View className="flex-1 bg-white px-4">
      <DrawerButton/>
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-2xl font-bold">Meus Favoritos</Text>

        {favoritos.length > 0 && (
          <TouchableOpacity onPress={handleLimparFavoritos}>
            <Text className="text-red-500 font-semibold">Limpar tudo</Text>
          </TouchableOpacity>
        )}
      </View>

      {favoritos.length === 0 ? (
        <Text className="text-gray-500">Nenhum serviço favoritado ainda.</Text>
      ) : (
        <FlatList
          data={favoritos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View className="mb-4">
              <CardHorizontalServi servi={item} />
            </View>
          )}
        />
      )}
    </View>
  );
}
