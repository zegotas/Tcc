import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Alert, SafeAreaView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Voltar } from '@/src/components/voltar';
import { FormServiOne } from '@/src/components/criarServi/header';
import { router } from 'expo-router';
import { ProgressBar } from '@/src/components/progressbar/ProgressBar';

export default function Photo() {
  const [images, setImages] = useState<string[]>([]);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: false,
        quality: 1,
        base64: false,
      });

      if (!result.canceled) {
        const selectedAsset = result.assets[0];
        const validFormats = ['jpg', 'jpeg', 'png', 'webp'];
        const extension = selectedAsset.uri.split('.').pop()?.toLowerCase();

        if (extension && !validFormats.includes(extension)) {
          Toast.show({
            type: 'error',
            text1: 'Formato inválido',
            text2: 'Apenas JPG, PNG ou WEBP são permitidos.',
          });
          return;
        }

        const response = await fetch(selectedAsset.uri);
        const blob = await response.blob();

        if (blob.size > 10 * 1024 * 1024) {
          Toast.show({
            type: 'error',
            text1: 'Imagem muito grande',
            text2: 'Selecione imagens de até 10MB.',
          });
          return;
        }

        if (images.length >= 6) {
          Toast.show({
            type: 'error',
            text1: 'Limite atingido',
            text2: 'Você pode adicionar no máximo 6 fotos.',
          });
          return;
        }

        setImages((prev) => [...prev, selectedAsset.uri]);
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao selecionar imagem',
      });
    }
  };

  const handleRemove = (index: number) => {
    Alert.alert("Remover", "Deseja remover esta imagem?", [
      { text: "Cancelar" },
      {
        text: "Remover",
        style: "destructive",
        onPress: () => {
          setImages((prev) => prev.filter((_, i) => i !== index));
        },
      },
    ]);
  };

  const handleNext = () => {
    if (images.length === 0) {
      Toast.show({
        type: 'error',
        text1: 'Selecione pelo menos uma imagem.',
      });
      return;
    }

    console.log("Imagens selecionadas:", images);
    router.push("/criar/tela4");
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} className="bg-slate-300 px-4" contentContainerStyle={{ paddingBottom: 150 }}>
          <Voltar />
          <FormServiOne />

          <Text className="text-xl font-bold mt-6 mb-3">
            Adicione até 6 fotos nos formatos JPG, PNG ou WEBP *
          </Text>

          <TouchableOpacity onPress={pickImage} className="bg-sky-500 px-6 py-3 rounded-full mb-4">
            <Text className="text-white text-center font-medium">Selecionar Imagem</Text>
          </TouchableOpacity>

          <View className="flex-row flex-wrap justify-between">
            {images.map((uri, index) => (
              <TouchableOpacity key={index} onLongPress={() => handleRemove(index)}>
                <Image source={{ uri }} className="w-32 h-32 rounded-lg mb-4" resizeMode="cover" />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>


        <View className="absolute bottom-14 left-0 right-0 px-4">
          <ProgressBar percentage={40} />
        </View>


        <View className="absolute bottom-0 left-0 right-0 bg-slate-300 px-4 py-4 border-t border-gray-300 flex-row justify-between items-center">
          <TouchableOpacity onPress={() => router.back()}>
            <Text className="color-black font-medium">Voltar</Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-sky-500 px-6 py-2 rounded-full" onPress={handleNext}>
            <Text className="text-white font-medium">Continuar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
