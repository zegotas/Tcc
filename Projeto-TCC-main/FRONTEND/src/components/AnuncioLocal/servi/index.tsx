import { View, Pressable, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { ServicoProps } from '..';
import { router } from 'expo-router';
import { adicionarFavorito, isFavorito, removerFavorito } from '@/src/utils/favoritos';

interface Props {
  servi: ServicoProps;
  refreshOnToggleFavorito?: () => void; // <- Adiciona essa linha
}




export function CardHorizontalServi({ servi, refreshOnToggleFavorito }: Props) {
  const navigation = useNavigation();
  
  const [favorito, setFavorito] = useState(false);

  useEffect(() => {
    async function checkFavorito() {
      const fav = await isFavorito(servi.id);
      setFavorito(fav);
    }
    checkFavorito();
  }, [servi.id]);

  async function toggleFavorito() {
    if (favorito) {
      await removerFavorito(servi.id);
    } else {
      await adicionarFavorito(servi);
    }
    setFavorito(!favorito);

    // Executa o callback se existir
    if (refreshOnToggleFavorito) {
      refreshOnToggleFavorito();
    }
  }

  return (
    <Pressable 
      onPress={() => router.push({ pathname: '/telaServico', params: { servi: JSON.stringify(servi) } })}
      className="w-44 flex flex-col rounded-xl relative bg-white mr-2"
    >
      <View>
        <Image
          source={{ uri: servi.image }}
          className="w-full h-36 flex-col rounded-t-xl"
          resizeMode="cover"
        /> 

        <TouchableOpacity
          onPress={toggleFavorito}
          className="absolute top-2 right-2 z-10"
        >
          <Ionicons
            name={favorito ? 'heart' : 'heart-outline'}
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
