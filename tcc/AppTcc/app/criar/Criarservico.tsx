import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useRouter } from 'expo-router';

type RootStackParamList = {
  CriarServico: undefined;
  Subcategoria: { categoria: string };
  // Adicione outras rotas aqui conforme necessário
};

const categorias = [
  'Serviços de manutenção',
  'Serviços domésticos',
  'Beleza e estética',
  'Eventos e festas',
  'Serviços administrativos e Profissionais',
  'Pets',
  'Educação e aulas particulares'
];
export default function CriarServico() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [selecionado, setSelecionado] = useState<string | null>(null);

  const router = useRouter();



  function handleContinuar() {
    if (!selecionado) {
      alert("Selecione uma categoria primeiro.");
      return;
    }
    navigation.navigate('Subcategoria', { categoria: selecionado });
  }

  return (
    <View className="flex-1 bg-white px-6 pt-10">
      <Text className="text-xl font-semibold mb-2">Informe as características do serviço</Text>

      <Text className="text-base font-medium mt-6">Tipo</Text>

      <ScrollView className="mt-2" showsVerticalScrollIndicator={false}>
        {categorias.map((categoria, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelecionado(categoria)}
            className="flex-row items-center mb-3"
          >
            <View
              className={`w-5 h-5 border-2 rounded mr-3 ${
                selecionado === categoria ? 'bg-indigo-700 border-indigo-700' : 'border-gray-400'
              }`}
            />
            <Text className="text-base">{categoria}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View className="h-2 bg-gray-200 w-full rounded-full mb-4">
        <View className="h-2 bg-indigo-400 w-1/6 rounded-full" />
      </View>

      <View className="flex-row justify-between items-center mb-6">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text className="color-black font-medium">Voltar</Text>
        </TouchableOpacity>

        <TouchableOpacity className="bg-indigo-400 px-6 py-2 rounded-full" 
            onPress={() => router.push({
            pathname: '/criar/tela2/Subcategoria',
            params: { categoria: selecionado }
})}>
          <Text className="text-white font-medium">Continuar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
