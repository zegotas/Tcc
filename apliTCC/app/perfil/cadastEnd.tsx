import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, FlatList, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { styles } from '../../src/pages/perfil/endereco/styles';
import Toast from 'react-native-toast-message';
import { toastConfig } from '@/src/components/toastConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApiUrl } from "@/src/global/api";

export default function CadastEnd() {
  const router = useRouter();

  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [cep, setCep] = useState('');
  const [enderecosExtras, setEnderecosExtras] = useState<string[]>([]);
  const [novoEndereco, setNovoEndereco] = useState('');
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    AsyncStorage.getItem('userId').then(async (id) => {
      if (!id) return;
      setUserId(id);
      // Busque endereços extras do backend se houver suporte
      // Exemplo: const res = await fetch(`${getApiUrl()}/users/${id}/enderecos`);
      // setEnderecosExtras(await res.json());
    });
  }, []);

  const showError = (campo: string) => {
    Toast.show({
      type: 'error',
      text1: `O campo "${campo}" é obrigatório.`,
    });
  };

  const handleSalvar = async () => {
    if (!rua.trim()) return showError('Rua');
    if (!numero.trim()) return showError('Número');
    if (!bairro.trim()) return showError('Bairro');
    if (!cidade.trim()) return showError('Cidade');
    if (!estado.trim()) return showError('Estado');
    if (!cep.trim()) return showError('CEP');

    const userId = await AsyncStorage.getItem('userId');
    if (!userId) {
      Toast.show({ type: 'error', text1: 'Usuário não encontrado.' });
      return;
    }

    const enderecoObj = { rua, numero, bairro, cidade, estado, cep };

    const response = await fetch(`${getApiUrl()}/users/${userId}/endereco`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(enderecoObj),
    });

    if (response.ok) {
      Toast.show({ type: "success", text1: "Endereço salvo!" });
      router.replace('/perfil/endereco');
    } else {
      Toast.show({ type: "error", text1: "Erro ao salvar endereço" });
    }
  };

  const handleAdicionarEnderecoExtra = async () => {
    if (!novoEndereco.trim()) return;
    // Salve no backend se houver suporte
    // await fetch(`${getApiUrl()}/users/${userId}/enderecos`, { ... });
    setEnderecosExtras([...enderecosExtras, novoEndereco]);
    setNovoEndereco('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Rua"
        value={rua}
        onChangeText={setRua}
      />
      <TextInput
        style={styles.input}
        placeholder="Número"
        value={numero}
        onChangeText={setNumero}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Complemento"
        value={complemento}
        onChangeText={setComplemento}
      />
      <TextInput
        style={styles.input}
        placeholder="Bairro"
        value={bairro}
        onChangeText={setBairro}
      />
      <TextInput
        style={styles.input}
        placeholder="Cidade"
        value={cidade}
        onChangeText={setCidade}
      />
      <TextInput
        style={styles.input}
        placeholder="Estado"
        value={estado}
        onChangeText={setEstado}
      />
      <TextInput
        style={styles.input}
        placeholder="CEP"
        value={cep}
        onChangeText={setCep}
        keyboardType="numeric"
        maxLength={8}
      />

      <Pressable style={styles.botaoSalvar} onPress={handleSalvar}>
        <Text style={styles.textoBotao}>Salvar Endereço</Text>
      </Pressable>

      <Text>Endereços Extras</Text>
      <FlatList
        data={enderecosExtras}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => <Text>{item}</Text>}
      />
      <TextInput
        value={novoEndereco}
        onChangeText={setNovoEndereco}
        placeholder="Adicionar endereço extra"
      />
      <Pressable onPress={handleAdicionarEnderecoExtra}>
        <Text>Adicionar Endereço Extra</Text>
      </Pressable>

      <Toast config={toastConfig} />
    </ScrollView>
  );
}
