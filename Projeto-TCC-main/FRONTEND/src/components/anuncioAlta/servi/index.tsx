import React, { useEffect, useState } from 'react';
import { View, Pressable, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { ServicoProps } from '..';
import {
  adicionarFavorito,
  removerFavorito,
  isFavorito
} from '@/src/utils/favoritos';

export function CardHorizontalServi({ servi }: { servi: ServicoProps }) {
  const [favoritado, setFavoritado] = useState(false);

  useEffect(() => {
    const verificar = async () => {
      const favorito = await isFavorito(servi.id);
      setFavoritado(favorito);
    };
    verificar();
  }, [servi.id]);

  const toggleFavorito = async () => {
    if (favoritado) {
      await removerFavorito(servi.id);
      setFavoritado(false);
    } else {
      await adicionarFavorito(servi);
      setFavoritado(true);
    }
  };

  return (
    <Pressable
      onPress={() =>
        router.push({ pathname: '/telaServico', params: { servi: JSON.stringify(servi) } })
      }
      className="w-44 flex flex-col rounded-xl relative bg-white mr-2"
    >
      <View>
        <Image
          source={{ uri: servi.image }}
          className="w-full h-36 rounded-t-xl"
          resizeMode="cover"
        />

        {/* Coração sobreposto na imagem */}
        <TouchableOpacity
          onPress={toggleFavorito}
          className="absolute top-2 right-2 p-1 rounded-full bg-white"
        >
          <Ionicons
            name={favoritado ? 'heart' : 'heart-outline'}
            size={20}
            color="red"
          />
        </TouchableOpacity>
      </View>

      <View className="px-1 py-2">
        <Text
          className="text-black mt-1 w-full overflow-hidden"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {servi.name}
        </Text>

        <Text
          className="text-green-700 font-medium text-lg w-full overflow-hidden"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          R$ {servi.price}
        </Text>

        <Text className="text-black mt-1 w-full overflow-hidden" numberOfLines={1}>
          {servi.location}
        </Text>

        <Text className="text-neutral-600 text-sm w-full overflow-hidden" numberOfLines={1}>
          {servi.time}
        </Text>
      </View>
    </Pressable>
  );
}
