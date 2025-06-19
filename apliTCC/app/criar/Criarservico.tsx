import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ProgressBar } from '@/src/components/progressbar/ProgressBar';

type RootStackParamList = {
  CriarServico: undefined;
  Subcategoria: { categoria: string };
};

const categorias = [
  { key: 'servicosManutencao', label: 'Serviços de manutenção' },
  { key: 'servicosDomesticos', label: 'Serviços domésticos' },
  { key: 'belezaEstetica', label: 'Beleza e estética' },
  { key: 'eventosFestas', label: 'Eventos e festas' },
  { key: 'servicosAdministrativosProfissionais', label: 'Serviços administrativos e profissionais' },
  { key: 'pets', label: 'Pets' },
  { key: 'educacaoAulasParticulares', label: 'Educação e aulas particulares' },
  { key: 'saudeBemEstar', label: 'Saúde e bem-estar' },
  { key: 'outros', label: 'Outros' },
];

export default function CriarServico() {

  const [selecionado, setSelecionado] = useState<{ key: string, label: string } | null>(null);
  const router = useRouter();

  function handleContinuar() {
    if (selecionado) {
      router.push({
        pathname: '/criar/tela2/Subcategoria',
        params: { categoria: selecionado.key }
      });
    }
  }

  return (
    <View className="flex-1 bg-slate-200 px-6 pt-10">
      <Text className="text-xl font-semibold mb-2">Informe as características do serviço</Text>

      <Text className="text-base font-medium mt-6">Tipo</Text>

      <ScrollView className="mt-2" showsVerticalScrollIndicator={false}>
        {categorias.map((categoria) => (
          <TouchableOpacity
            key={categoria.key}
            onPress={() => setSelecionado(categoria)}
            className="flex-row items-center mb-3"
          >
            <View
              className={`w-5 h-5 border-2 rounded mr-3 ${
                selecionado?.key === categoria.key ? 'bg-white border-black' : 'border-gray-400'
              }`}
            />
            <Text className="text-base">{categoria.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ProgressBar percentage={0} />

      <View className="flex-row justify-between items-center mb-6">
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="color-black font-medium">Voltar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`px-6 py-2 rounded-full ${selecionado ? 'bg-sky-500' : 'bg-gray-400'}`}
          disabled={!selecionado}
          onPress={handleContinuar}
        >
          <Text className="text-white font-medium">Continuar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
