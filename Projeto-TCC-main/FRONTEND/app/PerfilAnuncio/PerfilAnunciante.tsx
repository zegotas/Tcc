import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5, Feather } from '@expo/vector-icons';
import { GestureHandlerRootView, Pressable } from 'react-native-gesture-handler';
import { Voltar } from '@/src/components/voltar';
import { router, useLocalSearchParams } from 'expo-router';
import { goToChatWithUser } from '@/src/utils/chatHelper';
import { HeaderPerfil } from '@/src/components/PerfilAnunciante/header'; 
import { ContatoPerfil } from '@/src/components/PerfilAnunciante/contato';

export default function PerfilAnunciante() {
  const { anunciante } = useLocalSearchParams();
  const data = JSON.parse(anunciante as string);

  // Comentários
  const [comentarios, setComentarios] = useState<Array<{
    _id?: string,
    texto: string,
    autor?: string,
    nota?: number,
    imagem?: string
  }>>([]);
  const [loadingComentario, setLoadingComentario] = useState(false);
  const [comentarioFotoVisivel, setComentarioFotoVisivel] = useState<{[id: string]: boolean}>({});

  // Buscar comentários ao abrir o perfil
  useEffect(() => {
    async function fetchComentarios() {
      try {
        setLoadingComentario(true);
        const res = await fetch(`http://10.0.2.2:3001/api/comentarios/${data._id}`);
        const json = await res.json();
        setComentarios(json);
      } catch (e) {
        setComentarios([]);
      } finally {
        setLoadingComentario(false);
      }
    }
    fetchComentarios();
  }, [data._id]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} className="bg-slate-200 px-4">

          <Voltar />

          <HeaderPerfil
            nome={data.nome}
            ultimoAcesso={data.ultimoAcesso}
            desde={data.desde}
            cidade={data.cidade}
          />

          <View className="bg-white mt-4 p-4 rounded-2xl shadow">
            <Text className="text-xl font-bold mb-3">Verificações</Text>

            <View className="flex-row items-center mb-2">
              <Feather name="mail" size={20} color="green" />
              <Text className="ml-2 text-gray-700">E-mail verificado</Text>
            </View>

            <View className="flex-row items-center mb-2">
              <Feather name="phone" size={20} color="green" />
              <Text className="ml-2 text-gray-700">Telefone verificado</Text>
            </View>
          </View>

          <ContatoPerfil
            userId={data._id}
            nome={data.nome}
            foto={data.foto || 'https://i.imgur.com/hNJGtug.jpeg'}
          />

          <View className="bg-white mt-4 p-4 rounded-2xl shadow">
            <View className="flex-row items-center mb-3">
              <MaterialIcons name="history" size={20} color="gray" />
              <Text className="ml-2 text-xl font-bold">Histórico</Text>
            </View>

            <Text className="text-gray-600">{data.anuncios || 5} anúncios publicados nos últimos 180 dias</Text>
          </View>

          {/* Seção de comentários */}
          <View className="bg-white mt-4 p-4 rounded-2xl shadow">
            <Text className="text-xl font-bold mb-3">Comentários</Text>
            {loadingComentario && <ActivityIndicator size="small" color="#888" />}
            {comentarios.length === 0 && !loadingComentario && (
              <Text className="text-gray-500 mb-2">Nenhum comentário ainda.</Text>
            )}
            {comentarios.map((c, idx) => (
              <View key={c._id || idx} style={{ marginBottom: 8, borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 4 }}>
                <Text style={{ fontWeight: 'bold', color: '#333' }}>{c.autor || 'Usuário'}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
                  {c.nota && (
                    <View style={{ flexDirection: 'row', marginRight: 6 }}>
                      {[1,2,3,4,5].map((star) => (
                        <Ionicons
                          key={star}
                          name={star <= (c.nota ?? 0) ? 'star' : 'star-outline'}
                          size={16}
                          color={star <= (c.nota ?? 0) ? 'orange' : 'gray'}
                          style={{ marginHorizontal: 0 }}
                        />
                      ))}
                    </View>
                  )}
                  <Text style={{ color: '#444' }}>{c.texto}</Text>
                </View>
                {c.imagem && (
                  <TouchableOpacity
                    onPress={() => setComentarioFotoVisivel(v => ({ ...v, [c._id || idx]: !v[c._id || idx] }))}
                    style={{ marginTop: 4, alignSelf: 'flex-start', backgroundColor: '#eee', padding: 6, borderRadius: 6 }}
                  >
                    <Text style={{ color: '#2563eb', fontWeight: 'bold' }}>{comentarioFotoVisivel[c._id || idx] ? 'Ocultar foto' : 'Ver foto'}</Text>
                  </TouchableOpacity>
                )}
                {c.imagem && comentarioFotoVisivel[c._id || idx] && (
                  <Image source={{ uri: c.imagem }} style={{ width: 120, height: 120, borderRadius: 8, marginTop: 6 }} />
                )}
              </View>
            ))}
          </View>

        </ScrollView>


      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
