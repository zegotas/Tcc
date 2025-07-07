import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApiUrl } from "@/src/global/api";
import { useRouter } from 'expo-router';
import { Voltar } from '@/src/components/voltar';

export default function ExcluirEnd() {
  const [enderecos, setEnderecos] = useState<any[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    AsyncStorage.getItem('userId').then(async (id) => {
      if (!id) return;
      setUserId(id);
      // Busque o endereço principal e os extras do usuário
      const res = await fetch(`${getApiUrl()}/users/${id}`);
      const user = await res.json();
      let lista: any[] = [];
      if (user && user.endereco) lista.push(user.endereco);
      if (user && Array.isArray(user.enderecosExtras)) lista = lista.concat(user.enderecosExtras);
      setEnderecos(lista);
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
            // Se for endereço extra
            if (index > 0) {
              const res = await fetch(`${getApiUrl()}/users/${userId}/enderecos/${index - 1}`, {
                method: 'DELETE',
              });
              if (res.ok) {
                setEnderecos((prev) => prev.filter((_, i) => i !== index));
                Alert.alert('Sucesso', 'Endereço extra excluído!');
                router.replace('/perfil/endereco');
              } else {
                Alert.alert('Erro', 'Não foi possível excluir o endereço extra.');
              }
            } else {
              // Endereço principal
              const res = await fetch(`${getApiUrl()}/users/${userId}/endereco`, {
                method: 'DELETE',
              });
              if (res.ok) {
                setEnderecos((prev) => prev.filter((_, i) => i !== index));
                Alert.alert('Sucesso', 'Endereço principal excluído!');
                router.replace('/perfil/endereco');
              } else {
                Alert.alert('Erro', 'Não foi possível excluir o endereço principal.');
              }
            }
          }
        }
      ]
    );
  };

  return (

    <View className='flex-1 bg-white'>
      <Voltar/>
      <View style={{ backgroundColor: '#white', padding: 20 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 22, marginBottom: 18, color: '#222' }}>Selecione o endereço para excluir:</Text>
      <FlatList
        data={enderecos}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item, index }) => (
          <View style={{ marginBottom: 16, padding: 16, backgroundColor: '#fff', borderRadius: 10, borderWidth: 2, borderColor: 'black'}}>
            {typeof item === 'string' ? (
              <Text style={{ color: '#555', fontSize: 15 }}>{item}</Text>
            ) : (
              <>
                <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#333', marginBottom: 2 }}>{item.rua}, {item.numero} {item.complemento ? `- ${item.complemento}` : ''}</Text>
                <Text style={{ color: '#666', fontSize: 15 }}>{item.bairro}, {item.cidade} - {item.estado}</Text>
                <Text style={{ color: '#888', fontSize: 14, marginTop: 2 }}>CEP: {item.cep}</Text>
              </>
            )}
            <Pressable
              style={{ marginTop: 12, backgroundColor: '#dc2626', padding: 10, borderRadius: 8, alignItems: 'center' }}
              onPress={() => handleExcluir(index)}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15 }}>Excluir</Text>
            </Pressable>
          </View>
        )}
        ListEmptyComponent={<Text style={{ color: '#888', fontSize: 16, textAlign: 'center', marginTop: 40 }}>Nenhum endereço cadastrado.</Text>}
      />
    </View>    

    </View>

  );
}