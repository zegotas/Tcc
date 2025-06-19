import React from 'react';
import { View, Text, TouchableOpacity, TextInput, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Toast from 'react-native-toast-message';
import { ScrollView, GestureHandlerRootView } from 'react-native-gesture-handler';
import { Voltar } from '@/src/components/voltar';
import { FormServiOne } from '@/src/components/criarServi/header';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ProgressBar } from '@/src/components/progressbar/ProgressBar';

// Schema atualizado
const schema = yup.object({
  tipo: yup.string().required('Selecione o tipo de pagamento'),
  valor: yup.string().when('tipo', {
    is: (val: string) => val === 'pagamento',
    then: (schema) => schema.required('Informe o valor'),
    otherwise: (schema) => schema.notRequired(),
  }),
  servico: yup.string().when('tipo', {
    is: (val: string) => val === 'permuta',
    then: (schema) => schema.required('Informe o serviço que será trocado'),
    otherwise: (schema) => schema.notRequired(),
  }),
  valorEstimado: yup.string().when('tipo', {
    is: (val: string) => val === 'permuta',
    then: (schema) => schema.required('Informe o valor estimado da permuta'),
    otherwise: (schema) => schema.notRequired(),
  }),
});

export default function Pagamento() {
  const router = useRouter();
  const params = useLocalSearchParams();
  // params agora contém os dados das telas anteriores
  const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const tipo = watch('tipo');

  const handleNextStep = (data: any) => {
    // Junte os dados anteriores (params) com os dados de pagamento (data)
    router.push({
      pathname: "/criar/tela6/Revisao",
      params: {
        ...params, // dados das telas anteriores
        tipoPagamento: data.tipo,
        valor: data.valor,
        servicoPermuta: data.servico,
        valorEstimado: data.valorEstimado,
      }
    });
  };

  const handleErrors = () => {
    const allErrors = Object.values(errors).map((e: any) => e?.message);
    if (allErrors.length > 0) {
      Toast.show({
        type: 'error',
        text1: 'Preencha os campos obrigatórios!',
        text2: allErrors[0],
      });
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false} className="bg-slate-300 px-4" contentContainerStyle={{ paddingBottom: 150 }}>
            <Voltar />
            <FormServiOne />

            <Text className="text-xl font-bold mt-6 mb-3">Forma de pagamento *</Text>

            <View className="flex-row justify-around mb-6">
              <TouchableOpacity
                className={`px-6 py-3 rounded-full ${tipo === 'pagamento' ? 'bg-sky-500' : 'bg-gray-400'}`}
                onPress={() => setValue('tipo', 'pagamento')}
              >
                <Text className="text-white font-medium">Pagamento</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className={`px-6 py-3 rounded-full ${tipo === 'permuta' ? 'bg-sky-500' : 'bg-gray-400'}`}
                onPress={() => setValue('tipo', 'permuta')}
              >
                <Text className="text-white font-medium">Permuta</Text>
              </TouchableOpacity>
            </View>

            {tipo === 'pagamento' && (
              <View className="mb-6">
                <Text className="text-base mb-1">Valor (R$) *</Text>
                <Controller
                  control={control}
                  name="valor"
                  render={({ field }) => (
                    <TextInput
                      className="bg-white rounded-lg h-14 px-4 text-lg"
                      placeholder="Ex: 150,00"
                      keyboardType="numeric"
                      value={field.value}
                      onChangeText={field.onChange}
                    />
                  )}
                />
              </View>
            )}

            {tipo === 'permuta' && (
              <>
                <View className="mb-6">
                  <Text className="text-base mb-1">Serviço ofertado *</Text>
                  <Controller
                    control={control}
                    name="servico"
                    render={({ field }) => (
                      <TextInput
                        className="bg-white rounded-lg h-14 px-4 text-lg"
                        placeholder="Ex: Troca por manutenção elétrica"
                        value={field.value}
                        onChangeText={field.onChange}
                      />
                    )}
                  />
                </View>

                <View className="mb-6">
                  <Text className="text-base mb-1">Valor estimado da permuta (R$) *</Text>
                  <Controller
                    control={control}
                    name="valorEstimado"
                    render={({ field }) => (
                      <TextInput
                        className="bg-white rounded-lg h-14 px-4 text-lg"
                        placeholder="Ex: 300,00"
                        keyboardType="numeric"
                        value={field.value}
                        onChangeText={field.onChange}
                      />
                    )}
                  />
                </View>
              </>
            )}
          </ScrollView>

          {/* ProgressBar fixa acima dos botões */}
          <View className="absolute bottom-20 left-0 right-0 px-4">
            <ProgressBar percentage={80} />
          </View>

          {/* Rodapé fixo com os botões */}
          <View className="absolute bottom-0 left-0 right-0 bg-slate-300 px-4 py-4 border-t border-gray-300 flex-row justify-between items-center">
            <TouchableOpacity onPress={() => router.back()}>
              <Text className="color-black font-medium">Voltar</Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-sky-500 px-6 py-2 rounded-full" onPress={handleSubmit(handleNextStep, handleErrors)}>
              <Text className="text-white font-medium">Continuar</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
}
