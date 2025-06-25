import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Pressable, TextInput, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { goToChatWithUser, getUserId } from '@/src/utils/chatHelper';
import { getApiUrl } from '@/src/global/api';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Image as RNImage } from 'react-native';

export function Corpo({ service }: { service: any }) {
  console.log('service recebido:', service);
  const router = useRouter();

  // Comentário
  const [comentario, setComentario] = useState('');
  const [nota, setNota] = useState(0); // nota de 1 a 5
  const [loadingComentario, setLoadingComentario] = useState(false);
  const [imagem, setImagem] = useState<string | null>(null);

  function renderStars() {
    return (
      <View style={{ flexDirection: 'row', marginBottom: 8 }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => setNota(star)}>
            <Ionicons
              name={star <= nota ? 'star' : 'star-outline'}
              size={28}
              color={star <= nota ? 'orange' : 'gray'}
              style={{ marginHorizontal: 2 }}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  async function buscarNomeUsuario(userId: string) {
    try {
      const res = await fetch(`${getApiUrl()}/users/${userId}`);
      if (res.ok) {
        const user = await res.json();
        return user.nome || user.name || 'Usuário';
      }
    } catch {}
    return 'Usuário';
  }

  async function escolherImagem() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
      base64: true
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImagem(`data:${result.assets[0].type || 'image/jpeg'};base64,${result.assets[0].base64}`);
    }
  }

  async function enviarComentario() {
    if (!comentario.trim() || nota === 0) {
      Alert.alert('Atenção', 'Preencha o comentário e selecione uma nota.');
      return;
    }
    setLoadingComentario(true);
    try {
      const userId = await getUserId();
      let autor = 'Usuário';
      if (userId) {
        autor = await buscarNomeUsuario(userId);
      }
      const body: any = { texto: comentario, autor, nota };
      if (imagem) body.imagem = imagem;
      const res = await fetch(`${getApiUrl()}/comentarios/${service.prestadorId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (res.ok) {
        setComentario('');
        setNota(0);
        setImagem(null);
        Alert.alert('Comentário enviado!', 'Seu comentário foi registrado e aparecerá no perfil do anunciante.');
      } else {
        Alert.alert('Erro', 'Não foi possível enviar o comentário.');
      }
    } catch {
      Alert.alert('Erro', 'Não foi possível enviar o comentário.');
    } finally {
      setLoadingComentario(false);
    }
  }

  return (
    <View className="flex">
      <Image 
        source={{ uri: service.image }} 
        className="w-full h-60 rounded-2xl"
        resizeMode="cover"
      />

      <Text className="text-black text-3xl font-bold mt-4">
        {service.name}
      </Text>

      {service.tipo === 'permuta' && (
        <View className='mt-4'>
          <Text className="text-black text-2xl font-bold mt-4">
            Valor estimado do serviço
          </Text>
          <Text className="text-black text-2xl font-bold">
            R$ {service.estimado}
          </Text>
        </View>
      )}

      <Text className='text-black text-xl mt-4 '>Localização: {service.location} </Text>  
      <Text className="text-neutral-500 text-base mt-1">
        Data estimada: {service.time}
      </Text>

      <Text className="text-green-700 font-bold text-2xl mt-3" >
        R$ {service.price}
      </Text>

      <View>
        <Text className='text-black font-bold text-xl mt-6'>Descrição</Text>  
        <Text className="text-black text-base mt-2 ">
          {service.description}
        </Text>
      </View>

      <View>
        <Text className='text-black font-bold text-xl mt-6'>Tipo de Serviço</Text>
        <Text className="text-black text-base mt-2 ">{service.type}</Text>
      </View>

      <View className="flex h-15 mt-6 bg-white p-2 rounded-2xl justify-between ">
        <Pressable
onPress={() => {
    router.push({
      pathname: '/PerfilAnuncio/PerfilAnunciante',
      params: {
        anunciante: JSON.stringify({
          _id: service.prestadorId, // Corrigido: envia o id do anunciante
          nome: service.prestador,
          foto: service.fotoPerfil || 'https://via.placeholder.com/100',
          ultimoAcesso: '13 min',
          desde: '2015',
          cidade: service.location,
          anuncios: 6
        })
      }
    });
  }}
        >
                  <Text className="text-2xl font-medium text-black ">Anunciante</Text>
        <Text className="text-xl text-gray-700 mt-1">
          {service.prestador}
        </Text>
        <View className='flex flex-row items-center space-x-1 gap-1 mt-6 right-3 absolute'>
          <Ionicons name="star" size={18} color="orange" />
          <Text className="text-gray-700">{service.rating || 'Sem avaliação'}</Text>
        </View> 
        </Pressable>
      
      </View>

      <TouchableOpacity 
        className="bg-indigo-400 mt-8 py-4 rounded-2xl items-center flex-row justify-center space-x-2"
        onPress={() => goToChatWithUser(service.prestadorId, service.prestador, service.fotoPerfil || 'https://via.placeholder.com/100')}
      >
        <Ionicons name="chatbubbles-outline" size={20} color="white" />
        <Text className="text-white text-base font-semibold">Entrar em Contato</Text>
      </TouchableOpacity>

      <View className="h-8" />

      {/* Campo de comentário para o anunciante */}
      <View className="bg-white mt-4 p-4 rounded-2xl shadow">
        <Text className="text-xl font-bold mb-3">Deixe um comentário para o anunciante</Text>
        {renderStars()}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TextInput
            style={{ flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, backgroundColor: '#f9f9f9' }}
            placeholder="Escreva um comentário..."
            value={comentario}
            onChangeText={setComentario}
            editable={!loadingComentario}
          />
          <TouchableOpacity
            onPress={enviarComentario}
            style={{ marginLeft: 8, backgroundColor: '#2563eb', paddingVertical: 8, paddingHorizontal: 14, borderRadius: 8 }}
            disabled={loadingComentario || !comentario.trim() || nota === 0}
          >
            {loadingComentario ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Enviar</Text>
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={escolherImagem} style={{ marginTop: 10, alignSelf: 'flex-start', backgroundColor: '#eee', padding: 8, borderRadius: 8 }}>
          <Text style={{ color: '#2563eb', fontWeight: 'bold' }}>{imagem ? 'Trocar foto' : 'Adicionar foto'}</Text>
        </TouchableOpacity>
        {imagem && (
          <View style={{ marginTop: 8, alignItems: 'flex-start' }}>
            <RNImage source={{ uri: imagem }} style={{ width: 80, height: 80, borderRadius: 8 }} />
          </View>
        )}
      </View>
      {/* Espaço extra para afastar do rodapé */}
      <View style={{ height: 40 }} />
    </View>
  );
}
