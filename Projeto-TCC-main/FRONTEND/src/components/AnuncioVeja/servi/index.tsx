import { View, Pressable, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { ServicoProps } from '..';
import { router } from 'expo-router';

export function CardHorizontalServi({ servi }: { servi: ServicoProps }) {
  const navigation = useNavigation();

  return (
    <Pressable 
      onPress={() => router.navigate({ pathname: '/telaServico', params: { servi: JSON.stringify(servi) } })}
      className="w-full flex flex-col rounded-xl relative bg-white mr-2"
    >
      <Image
        source={{ uri: servi.image }}
        className="w-full h-[160px] rounded-t-xl"
        resizeMode="cover"
      /> 

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
