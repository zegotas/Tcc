import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { router } from 'expo-router';
import { ProgressBar } from '@/src/components/progressbar/ProgressBar';

const subcategoriasPorCategoria: Record<string, string[]> = {
  'Serviços de manutenção': [
    'Eletricista',
    'Encanador',
    'Pintor',
    'Jardineiro',
    'Serralheiro',
    'Chaveiro',
    'Reparos em eletrodomésticos',
    'Reparos em eletrônicos',
    'Reparos em móveis',
    'Pedreiro',
    'Marceneiro',
    'Técnico em Refrigeração',
    'Gesseiro',
    'Outros'
  ],
  'Serviços domésticos': [
    'Diarista',
    'Cozinheiro',
    'Lavanderia',
    'Passadeira',
    'Babá',
    'Cuidador de pessoas com deficiência',
    'Faxina residencial',
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
    'Quiropraxista',
    'Barbeiro',
    'Tatuador',    
    'Outros'
  ],
  'Eventos e festas': [
    'Aluguel de brinquedos',
    'Salão de festas',
    'Buffet infantil',
    'Decoração de festas',
    'Fotografia de eventos',
    'Filmagem de eventos',
    'DJ e(ou) Música ao vivo',
    'Segurança para eventos',
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
    'Desenvolvedor de software',
    'Fotógrafo',
    'Videomaker',
    'Consultor de marketing',
    'Social media',
    'Outros'
  ],
  'Pets': [
    'Banho e tosa',
    'Adestramento',
    'Veterinário domiciliar',
    'Pet Sitter',
    'Pet Walker',
    'Hospedagem de pets',
    'Outros'
  ],
  'Educação e aulas particulares': [
    'Aulas de reforço escolar',
    'Aulas de música',
    'Aulas de idiomas',
    'Aulas de culinária',
    'Aulas de artesanato',
    'Aulas de yoga',
    'Aulas de pilates',
    'Aulas de esportes',
    'Aula de informática',
    'Aulas de dança',
    'Outros'
  ],
};

export default function Subcategoria() {
  const route = useRoute();
  const { categoria } = route.params as { categoria: string };

  const subcategorias = subcategoriasPorCategoria[categoria] || [];
  const [selecionado, setSelecionado] = useState<string | null>(null);

  function handleContinuar() {
    if (selecionado) {
      // Aqui você pode navegar para a próxima tela enviando a subcategoria selecionada
      router.push({
        pathname: '/criar/tela3/Photo',
        params: { categoria: selecionado }
      });
    }
  }

  return (
    <View className="flex-1 bg-slate-200 px-6 pt-10">
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
                selecionado === sub ? 'bg-white border-black' : 'border-gray-400'
              }`}
            />
            <Text className="text-base">{sub}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>


        <ProgressBar percentage={20} />


      <View className="flex-row justify-between items-center mb-6">
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="color-black font-medium">Voltar</Text>
        </TouchableOpacity>

        

        <TouchableOpacity
          className={`px-6 py-2 rounded-full ${selecionado ? 'bg-indigo-400' : 'bg-gray-400'}`}
          disabled={!selecionado}
          onPress={handleContinuar}
        >
          <Text className="text-white font-medium">Continuar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
