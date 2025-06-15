import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Voltar } from '@/src/components/voltar';
import { FormServiOne } from '@/src/components/criarServi/header';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';

export default function Revisao() {


  const dadosServico = {
    categoria: 'Serviços de manutenção',
    subcategoria: 'Eletricista',
    name: 'Instalação elétrica residencial',
    description: 'Instalação completa de rede elétrica para casa nova.',
    date: '20/06/2025',
    cep: '12345678',
    cidade: 'São Paulo',
    tipoPagamento: 'permuta', 
    valor: '',                
    servicoPermuta: 'Troca por serviço de encanador',
    fotos: [
      'https://via.placeholder.com/150', 
      'https://via.placeholder.com/150'
    ]
  };

  const handleConfirmar = () => {
    // Aqui você enviaria tudo para o backend
    console.log('Cadastro finalizado:', dadosServico);

    Toast.show({
      type: 'success',
      text1: 'Serviço cadastrado com sucesso!',
    });

    router.push('/drawer/(tabs)/servicos'); // Redireciona para a home depois do cadastro
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false} className="bg-slate-300 px-4">
        <Voltar />
        <FormServiOne />

        <Text className="text-xl font-bold mt-6 mb-4">Revisar dados do serviço:</Text>

        <View className="mb-4">
          <Text className="font-bold">Categoria:</Text>
          <Text>{dadosServico.categoria} - {dadosServico.subcategoria}</Text>
        </View>

        <View className="mb-4">
          <Text className="font-bold">Nome do serviço:</Text>
          <Text>{dadosServico.name}</Text>
        </View>

        <View className="mb-4">
          <Text className="font-bold">Descrição:</Text>
          <Text>{dadosServico.description}</Text>
        </View>

        <View className="mb-4">
          <Text className="font-bold">Data:</Text>
          <Text>{dadosServico.date}</Text>
        </View>

        <View className="mb-4">
          <Text className="font-bold">Localização:</Text>
          <Text>CEP: {dadosServico.cep}</Text>
          <Text>Cidade: {dadosServico.cidade}</Text>
        </View>

        <View className="mb-4">
          <Text className="font-bold">Pagamento:</Text>
          {dadosServico.tipoPagamento === 'pagamento' ? (
            <Text>R$ {dadosServico.valor}</Text>
          ) : (
            <Text>Permuta: {dadosServico.servicoPermuta}</Text>
          )}
        </View>

        <View className="mb-4">
          <Text className="font-bold">Fotos:</Text>
          <View className="flex-row flex-wrap justify-between mt-2">
            {dadosServico.fotos.map((foto, index) => (
              <Image
                key={index}
                source={{ uri: foto }}
                className="w-32 h-32 rounded-lg mb-4"
                resizeMode="cover"
              />
            ))}
          </View>
        </View>

        <View className="h-2 bg-white w-full rounded-full my-6">
          <View className="h-2 bg-indigo-400 w-[100%] rounded-full" />
        </View>

        <View className="flex-row justify-between items-center mb-6">
          <TouchableOpacity onPress={() => router.back()}>
            <Text className="color-black font-medium">Voltar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-green-500 px-6 py-2 rounded-full"
            onPress={handleConfirmar}
          >
            <Text className="text-white font-medium">Confirmar Cadastro</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </GestureHandlerRootView>
  );
}
