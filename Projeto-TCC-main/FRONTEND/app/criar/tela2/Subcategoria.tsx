import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ProgressBar } from '@/src/components/progressbar/ProgressBar';

const subcategoriasPorCategoria = {
  servicosManutencao: [
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
    'Técnico em refrigeração',
    'Gesseiro',
    'Outros'
  ],
  servicosDomesticos: [
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
  belezaEstetica: [
    'Cabeleireiro',
    'Manicure e(ou) pedicure',
    'Maquiador',
    'Esteticista',
    'Depilação',
    'Designer de sobrancelhas',
    'Barbeiro',
    'Tatuador',    
    'Outros'
  ],
  eventosFestas: [
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
  servicosAdministrativosProfissionais: [
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
  pets: [
    'Banho e tosa',
    'Adestramento',
    'Veterinário domiciliar',
    'Pet Sitter',
    'Pet Walker',
    'Hospedagem de pets',
    'Outros'
  ],
  educacaoAulasParticulares: [
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
  saudeBemEstar: [
    'Nutricionista',
    'Personal trainer',
    'Psicólogo',
    'Fisioterapeuta',
    'Massagista',
    'Acupunturista',
    'Quiropraxista',
    'Terapeuta holístico',
    'Outros'
  ],
  outros: [
    'Outros',
  ]
};

export default function Subcategoria() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const categoria = params.categoria as string;

  type CategoriaKey = keyof typeof subcategoriasPorCategoria;
  const subcategorias = subcategoriasPorCategoria[categoria as CategoriaKey] || [];
  const [selecionado, setSelecionado] = useState<string | null>(null);
  const [outroTexto, setOutroTexto] = useState('');

  function handleContinuar() {
    if (selecionado) {
      const subcategoriaFinal = selecionado === 'Outros' ? outroTexto : selecionado;
      router.push({
        pathname: '/criar/tela3/Photo',
        params: { categoria, subcategoria: subcategoriaFinal }
      });
    }
  }

  console.log('Categoria recebida:', categoria);
  console.log('Chaves disponíveis:', Object.keys(subcategoriasPorCategoria));

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
        {/* Campo para digitar se for "Outros" */}
        {selecionado === 'Outros' && (
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 6,
              padding: 8,
              marginTop: 8,
              backgroundColor: '#fff'
            }}
            placeholder="Digite a subcategoria"
            value={outroTexto}
            onChangeText={setOutroTexto}
          />
        )}
      </ScrollView>

      <ProgressBar percentage={20} />

      <View className="flex-row justify-between items-center mb-6">
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="color-black font-medium">Voltar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`px-6 py-2 rounded-full ${selecionado && (selecionado !== 'Outros' || outroTexto) ? 'bg-sky-500' : 'bg-gray-400'}`}
          disabled={!selecionado || (selecionado === 'Outros' && !outroTexto)}
          onPress={handleContinuar}
        >
          <Text className="text-white font-medium">Continuar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
