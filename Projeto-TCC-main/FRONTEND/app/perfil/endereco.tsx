import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApiUrl } from "@/src/global/api";
import { useRouter } from 'expo-router';

import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { router } from 'expo-router';
const statusBarHeight = Constants.statusBarHeight;

export default function Endereco() {
  const [userId, setUserId] = useState<string | null>(null);
  const [enderecos, setEnderecos] = useState<any[]>([]);
  const router = useRouter();

  // Busca o endereço principal e os extras do usuário no backend
  useEffect(() => {
    AsyncStorage.getItem('userId').then(async (id) => {
      if (!id) return;
      setUserId(id);
      const res = await fetch(`${getApiUrl()}/users/${id}`);
      const user = await res.json();
      let lista: any[] = [];
      if (user && user.endereco) lista.push(user.endereco);
      if (user && Array.isArray(user.enderecosExtras)) lista = lista.concat(user.enderecosExtras);
      setEnderecos(lista);
    });
  }, []);

  return (
    <ScrollView className='flex-1 flex bg-white'>
        <Pressable 
          className='px-4 mb-2'
          style={{ marginTop: statusBarHeight }}
          onPress={() => router.navigate('/drawer/perfil')}
        >
            <Ionicons  name="arrow-back-outline" size={20} color="#121212" />
      </Pressable>

      <View style={{ backgroundColor: 'white', padding: 20 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 24, marginBottom: 18, color: '#222' }}>Meus Endereços</Text>
      {enderecos.length === 0 ? (
        <View style={{ alignItems: 'center', marginTop: 40 }}>
          <Text style={{ color: '#888', fontSize: 16 }}>Nenhum endereço cadastrado.</Text>
        </View>
      ) : (
        <View style={{ gap: 18 }}>
          {enderecos.map((end, idx) => (
            <View key={idx} style={{
              marginBottom: 0,
              backgroundColor: '#fff',
              padding: 16,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: 'black',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 4,
              elevation: 2,
            }}>
              {typeof end === 'string' ? (
                <Text style={{ color: '#555', fontSize: 15 }}>{end}</Text>
              ) : (
                <>
                  <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#333', marginBottom: 2 }}>{end.rua}, {end.numero} {end.complemento ? `- ${end.complemento}` : ''}</Text>
                  <Text style={{ color: '#666', fontSize: 15 }}>{end.bairro}, {end.cidade} - {end.estado}</Text>
                  <Text style={{ color: '#888', fontSize: 14, marginTop: 2 }}>CEP: {end.cep}</Text>
                </>
              )}
            </View>
          ))}
        </View>
      )}

      <Pressable
        style={{
          backgroundColor: '#28a745',
          padding: 14,
          borderRadius: 8,
          alignItems: 'center',
          marginTop: 28,
          marginBottom: 8,
          shadowColor: '#28a745',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.12,
          shadowRadius: 4,
          elevation: 2,
        }}
        onPress={() => router.push('/perfil/cadastEnd')}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Cadastrar Novo Endereço</Text>
      </Pressable>

      <Pressable
        style={{
          backgroundColor: '#dc3545',
          padding: 14,
          borderRadius: 8,
          alignItems: 'center',
          marginTop: 0,
          shadowColor: '#dc3545',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.12,
          shadowRadius: 4,
          elevation: 2,
        }}
        onPress={() => router.push('/perfil/excluirEnd')}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Excluir Endereço</Text>
      </Pressable>
      </View>
    </ScrollView>
  );
}
