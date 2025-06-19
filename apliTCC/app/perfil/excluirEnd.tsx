import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApiUrl } from "@/src/global/api";
import { useRouter } from 'expo-router';

export default function ExcluirEnd() {
  const [enderecos, setEnderecos] = useState<any[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    AsyncStorage.getItem('userId').then(async (id) => {
      if (!id) return;
      setUserId(id);
      // Busque os endereços do usuário
      const res = await fetch(`${getApiUrl()}/users/${id}`);
      const user = await res.json();
      if (user && user.enderecos) setEnderecos(user.enderecos);
      else if (user && user.endereco) setEnderecos([user.endereco]);
    });
  }, []);

  const handleExcluir = async (index: number) => {
    if (!userId) return;
    Alert.alert(
      'Excluir Endereço',
      'Tem certeza que deseja excluir este endereço?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sim',
          style: 'destructive',
          onPress: async () => {
            // Se você tem vários endereços, envie o índice ou id do endereço para o backend
            // Aqui, para um único endereço:
            const res = await fetch(`${getApiUrl()}/users/${userId}/endereco`, {
              method: 'DELETE',
            });
            if (res.ok) {
              setEnderecos((prev) => prev.filter((_, i) => i !== index));
              Alert.alert('Sucesso', 'Endereço excluído!');
              router.replace('/perfil/endereco');
            } else {
              Alert.alert('Erro', 'Não foi possível excluir o endereço.');
            }
          }
        }
      ]
    );
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 16 }}>Selecione o endereço para excluir:</Text>
      <FlatList
        data={enderecos}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item, index }) => (
          <View style={{ marginBottom: 12, padding: 12, backgroundColor: '#f1f1f1', borderRadius: 8 }}>
            <Text>{item.rua}, {item.numero} - {item.bairro}, {item.cidade} - {item.estado}, {item.cep}</Text>
            <Pressable
              style={{ marginTop: 8, backgroundColor: '#dc2626', padding: 8, borderRadius: 6, alignItems: 'center' }}
              onPress={() => handleExcluir(index)}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Excluir</Text>
            </Pressable>
          </View>
        )}
        ListEmptyComponent={<Text>Nenhum endereço cadastrado.</Text>}
      />
    </View>
  );
}