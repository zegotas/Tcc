import { Pressable, View, Text, Image } from 'react-native';
import { router } from 'expo-router'; // IMPORTANTE
import '../../../../global.css';
import { PrestadoresProps } from '..';

export function PrestadoresItem({ item }: { item: PrestadoresProps }) {
  return (
    <Pressable
      onPress={() => router.push({
        pathname: '/PerfilAnuncio/PerfilAnunciante',
        params: { anunciante: JSON.stringify(item) }
      })}
      className='flex flex-col items-center justify-center mb-4'
    >
      <Image
        source={{ uri: item.image }}
        className='w-20 h-20 rounded-full'
      />
      <Text className='text-sm mt-2 w-20 text-center leading-4 text-black' numberOfLines={2}>
        {item.name}
      </Text>
    </Pressable>
  );
}
