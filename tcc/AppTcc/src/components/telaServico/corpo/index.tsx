import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export function Corpo() {
  const { servi } = useLocalSearchParams();
  const service = JSON.parse(servi as string);

  return (
    <View className="flex">
      <Image 
        source={{ uri: service.image }} 
        className="w-full h-60 rounded-2xl"
        resizeMode="cover"
      />

      <Text className="text-black text-3xl font-bold mt-4">
        {service.name}
      </Text>

      {service.tipo === 'permuta' && (
        <View className='mt-4'>
          <Text className="text-black text-2xl font-bold mt-4">
            Valor estimado do serviço
          </Text>
          <Text className="text-black text-2xl font-bold">
            R$ {service.estimado}
          </Text>
        </View>
      )}

      <Text className='text-black text-xl mt-4 '>Localização: {service.location} </Text>  
      <Text className="text-neutral-500 text-base mt-1">
        Data estimada: {service.time}
      </Text>

      <Text className="text-green-700 font-bold text-2xl mt-3" >
        R$ {service.price}
      </Text>

      <View>
        <Text className='text-black font-bold text-xl mt-6'>Descrição</Text>  
        <Text className="text-black text-base mt-2 ">
          {service.description}
        </Text>
      </View>

      <View>
        <Text className='text-black font-bold text-xl mt-6'>Tipo de Serviço</Text>
        <Text className="text-black text-base mt-2 ">{service.type}</Text>
      </View>

      <View className="flex h-15 mt-6 bg-white p-2 rounded-2xl justify-between ">
        <Pressable
          onPress={() => alert('Função de contato em desenvolvimento')}
        >
                  <Text className="text-2xl font-medium text-black ">Anunciante</Text>
        <Text className="text-xl text-gray-700 mt-1">
          {service.prestador}
        </Text>
        <View className='flex flex-row items-center space-x-1 gap-1 mt-6 right-3 absolute'>
          <Ionicons name="star" size={18} color="orange" />
          <Text className="text-gray-700">{service.rating || 'Sem avaliação'}</Text>
        </View> 
        </Pressable>
      
      </View>

      <TouchableOpacity 
        className="bg-indigo-400 mt-8 py-4 rounded-2xl items-center flex-row justify-center space-x-2"
        onPress={() => alert('Função de contato em desenvolvimento')}
      >
        <Ionicons name="chatbubbles-outline" size={20} color="white" />
        <Text className="text-white text-base font-semibold">Entrar em Contato</Text>
      </TouchableOpacity>

      <View className="h-8" />
    </View>
  );
}
