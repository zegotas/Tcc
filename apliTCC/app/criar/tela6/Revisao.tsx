import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Voltar } from '@/src/components/voltar';
import { FormServiOne } from '@/src/components/criarServi/header';
import { router, useLocalSearchParams } from 'expo-router';
import Toast from 'react-native-toast-message';

export default function Revisao() {
  const params = useLocalSearchParams();

  const dadosServico = {
    categoria: params.categoria,
    subcategoria: params.subcategoria,
    name: params.name,
    description: params.description,
    date: params.date,
    cep: params.cep,
    cidade: params.cidade,
    tipoPagamento: params.tipoPagamento,
    valor: params.valor,
    servicoPermuta: params.servicoPermuta,
    fotos: params.fotos ? JSON.parse(params.fotos as string) : [],
  };

  const handleConfirmar = async () => {
    try {
      const response = await fetch('http://10.0.2.2:3000/api/servicos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          categoria: dadosServico.categoria,
          subcategoria: dadosServico.subcategoria,
          titulo: dadosServico.name,
          descricao: dadosServico.description,
          dataCriacao: new Date(),
          cep: dadosServico.cep,
          cidade: dadosServico.cidade,
          tipoPagamento: dadosServico.tipoPagamento,
          valor: dadosServico.valor,
          servicoPermuta: dadosServico.servicoPermuta,
          fotos: dadosServico.fotos,
        }),
      });

      if (response.ok) {
        Toast.show({
          type: 'success',
          text1: 'Serviço cadastrado com sucesso!',
        });
        router.push('/drawer/(tabs)/servicos');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Erro ao cadastrar serviço!',
        });
      }
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: 'Erro de conexão!',
      });
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false} className="bg-slate-300 px-4">
        <Voltar />
        <FormServiOne />

        <Text className="text-xl font-bold mt-6 mb-4">Revisar dados do serviço:</Text>

        <View className="mb-4">
          <Text className="font-bold">Categoria:</Text>
          <Text>{dadosServico.subcategoria}</Text>
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

        {dadosServico.tipoPagamento === 'permuta' && (
          <View className="mb-4">
            <Text className="font-bold">Valor estimado:</Text>
            <Text>R$ Valor estimado vai entrar aqui</Text>
          </View>
        )}

        <View className="mb-4">
          <Text className="font-bold">Fotos:</Text>
          <View className="flex-row flex-wrap justify-between mt-2">
            {dadosServico.fotos.map((foto: string, index: number) => (
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
          <View className="h-2 bg-blue-600 w-[100%] rounded-full" />
        </View>

        <View className="flex-row justify-between items-center mb-6">
          <TouchableOpacity onPress={() => router.back()}>
            <Text className="color-black font-medium">Voltar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-sky-500 px-6 py-2 rounded-full"
            onPress={handleConfirmar}
          >
            <Text className="text-white font-medium">Confirmar Cadastro</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
}