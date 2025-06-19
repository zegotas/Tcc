import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApiUrl } from "@/src/global/api";
import { useRouter } from 'expo-router';

export default function Endereco() {
  const [userId, setUserId] = useState<string | null>(null);
  const [enderecos, setEnderecos] = useState<any[]>([]);
  const router = useRouter();

  // Busca os endereços do usuário no backend
  useEffect(() => {
    AsyncStorage.getItem('userId').then(async (id) => {
      if (!id) return;
      setUserId(id);
      const res = await fetch(`${getApiUrl()}/users/${id}`);
      const user = await res.json();
      if (user && user.enderecos) setEnderecos(user.enderecos);
      else if (user && user.endereco) setEnderecos([user.endereco]);
    });
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 10 }}>Meus Endereços</Text>
      {enderecos.length === 0 ? (
        <Text>Nenhum endereço cadastrado.</Text>
      ) : (
        enderecos.map((end, idx) => (
          <View key={idx} style={{ marginBottom: 16, backgroundColor: '#f1f1f1', padding: 12, borderRadius: 8 }}>
            <Text>{end.rua}, {end.numero} {end.complemento ? `- ${end.complemento}` : ''}</Text>
            <Text>{end.bairro}, {end.cidade} - {end.estado}, {end.cep}</Text>
          </View>
        ))
      )}

      <Pressable
        style={{
          backgroundColor: '#28a745',
          padding: 12,
          borderRadius: 6,
          alignItems: 'center',
          marginTop: 10,
        }}
        onPress={() => router.push('/perfil/cadastEnd')}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Cadastrar Novo Endereço</Text>
      </Pressable>

      <Pressable
        style={{
          backgroundColor: '#dc3545',
          padding: 12,
          borderRadius: 6,
          alignItems: 'center',
          marginTop: 10,
        }}
        onPress={() => router.push('/perfil/excluirEnd')}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Excluir Endereço</Text>
      </Pressable>
    </View>
  );
}
