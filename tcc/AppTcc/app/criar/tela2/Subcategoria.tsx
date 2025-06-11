import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';

const subcategoriasPorCategoria: Record<string, string[]> = {
  'Serviços de manutenção': [
    'Eletricista',
    'Encanador',
    'Pintor',
    'Pedreiro',
    'Marceneiro',
    'Técnico em Refrigeração',
    'Gesseiro',
    'Outros'
  ],
  'Serviços domésticos': [
    'Diarista',
    'Cozinheiro',
    'Passadeira',
    'Faxina residencial',
    'Babá',
    'Cuidador de idosos',
    'Outros'
  ],
  'Beleza e estética': [
    'Cabeleireiro',
    'Manicure e(ou) Pedicure',
    'Maquiador',
    'Esteticista',
    'Depilação',
    'Designer de sobrancelhas',
    'Massoterapeuta',
    'Outros'
  ],
  'Eventos e festas': [
    'Aluguel de brinquedos',
    'Salão de festas',
    'Buffets',
    'Boleiras',
    'Outros'
  ],
  'Serviços administrativos e Profissionais': [
    'Contador',
    'Advogado',
    'Psicólogo',
    'Coach',
    'Tradutor',
    'Designer gráfico',
    'Social media',
    'Outros'
  ],
  'Pets': [
    'Banho e tosa',
    'Adestramento',
    'Veterinário domiciliar',
    'Pet Sitter',
    'Pet Walker',
    'Outros'
  ],
  'Educação e aulas particulares': [
    'Aulas de reforço escolar',
    'Aulas de inglês',
    'Aulas de música',
    'Aula de informática',
    'Aulas de dança',
    'Outros'
  ],
  
  
  // ... Você pode adicionar o resto depois
};

export default function Subcategoria() {
  const navigation = useNavigation();
  const route = useRoute();
  const { categoria } = route.params as { categoria: string };

  const subcategorias = subcategoriasPorCategoria[categoria] || [];

  const [selecionado, setSelecionado] = useState<string | null>(null);


  return (
    <View className="flex-1 bg-white px-6 pt-10">
      <Text className="text-xl font-semibold mb-2">Selecione o tipo de serviço:</Text>
      <Text className="text-base text-gray-500 mb-4">{categoria}</Text>

      <ScrollView className="mt-2" showsVerticalScrollIndicator={false}>
        {subcategorias.map((sub, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelecionado(sub)}
            className="flex-row items-center mb-3"
          >
            <View
              className={`w-5 h-5 border-2 rounded mr-3 ${
                selecionado === sub ? 'bg-indigo-700 border-indigo-700' : 'border-gray-400'
              }`}
            />
            <Text className="text-base">{sub}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity className="bg-indigo-400 px-6 py-2 rounded-full mt-8">
        <Text className="text-white font-medium text-center">Continuar</Text>
      </TouchableOpacity>
    </View>
  );
}
