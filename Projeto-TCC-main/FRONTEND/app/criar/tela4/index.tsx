import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Voltar } from '@/src/components/voltar';
import { FormServiOne } from '@/src/components/criarServi/header';
import { ScrollView, GestureHandlerRootView } from 'react-native-gesture-handler';
import { useLocalSearchParams, router } from 'expo-router';
import Toast from 'react-native-toast-message';

import { NameInput } from '../../../src/components/inputs/NameInput';
import { DescriptionInput } from '../../../src/components/inputs/DescriptionInput';
import { DateInput } from '../../../src/components/inputs/DateInputs';
import { CepInput } from '../../../src/components/inputs/CepInput';
import { ProgressBar } from '@/src/components/progressbar/ProgressBar';

const schema = yup.object({
  name: yup.string().required().max(100),
  description: yup.string().required().max(6000),
  date: yup.string().required().matches(/^\d{2}\/\d{2}\/\d{4}$/),
  cep: yup.string().required().matches(/^\d{8}$/),
});

export default function Criar() {
  const params = useLocalSearchParams();
  const { control, handleSubmit, getValues, formState } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange', // Valida enquanto digita
  });

  const descriptionRef = useRef<TextInput>(null);
  const [cidade, setCidade] = useState<string>('');
  const [loadingCidade, setLoadingCidade] = useState<boolean>(false);
  const [ultimaBusca, setUltimaBusca] = useState<string>('');

  async function buscarCidadePeloCep(cep: string) {
    if (cep === ultimaBusca) return;
    setUltimaBusca(cep);
    setLoadingCidade(true);

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        Toast.show({ type: 'error', text1: 'CEP inválido' });
        setCidade('');
      } else {
        setCidade(data.localidade);
      }
    } catch {
      Toast.show({ type: 'error', text1: 'Erro ao buscar cidade' });
      setCidade('');
    } finally {
      setLoadingCidade(false);
    }
  }

  const isValid = formState.isValid && cidade.length > 0;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false} className="bg-slate-300 px-4">
        <Voltar />
        <FormServiOne />

        <View className="mt-2 mb-1">
          <NameInput control={control} name="name" />
        </View>

        <View className="mt-8">
          <DescriptionInput control={control} name="description" />
        </View>

        <View className="mt-8">
          <DateInput control={control} name="date" />
        </View>

        <View className="mt-8">
          <CepInput
            control={control}
            name="cep"
            onBlurCep={() => {
              const cep = getValues("cep");
              if (cep?.length === 8) buscarCidadePeloCep(cep);
            }}
          />
        </View>

        <View className="px-2 mt-4">
          <Text className="text-xl font-bold">Cidade</Text>
          <View className="w-full bg-white rounded-lg h-14 justify-center px-4 flex-row items-center">
            {loadingCidade ? (
              <ActivityIndicator size="small" color="#000" />
            ) : (
              <Text className="text-lg">{cidade || 'Cidade será carregada aqui'}</Text>
            )}
          </View>
        </View>

        <View className="mt-6">
          <ProgressBar percentage={60} />

          <View className="flex-row justify-between items-center mb-6 mt-4">
            <TouchableOpacity onPress={() => router.back()}>
              <Text className="color-black font-medium">Voltar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              disabled={!isValid}
              onPress={handleSubmit((data) => {
                router.push({
                  pathname: "/criar/tela5/Pagamento",
                  params: {
                    ...params,
                    name: data.name,
                    description: data.description,
                    date: data.date,
                    cep: data.cep,
                    cidade: cidade,
                  },
                });
              })}
              className={`px-6 py-2 rounded-full ${isValid ? 'bg-sky-500' : 'bg-gray-400'}`}
            >
              <Text className="text-white font-medium">Continuar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
}
