import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';
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
  const [userId, setUserId] = useState<string | null>(null);
  const [mostrarExtras, setMostrarExtras] = useState(false);

  // Carrega endereços extras do AsyncStorage ao abrir a tela
  useEffect(() => {
    AsyncStorage.getItem('userId').then(async (id) => {
      if (!id) return;
      setUserId(id);
      try {
        const res = await fetch(`${getApiUrl()}/users/${id}/enderecos`);
        if (res.ok) {
          const extras = await res.json();
          setEnderecosExtras(Array.isArray(extras) ? extras : []);
        } else {
          setEnderecosExtras([]);
        }
      } catch (e) {
        setEnderecosExtras([]);
      }
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
    // Validação igual ao endereço principal
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
    const enderecoObj = { rua, numero, complemento, bairro, cidade, estado, cep };
    // Salva no backend
    await fetch(`${getApiUrl()}/users/${userId}/enderecos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ endereco: enderecoObj }),
    });
    Toast.show({ type: 'success', text1: 'Endereço extra salvo!' });
    setRua(''); setNumero(''); setComplemento(''); setBairro(''); setCidade(''); setEstado(''); setCep('');
    // Atualiza lista
    const res = await fetch(`${getApiUrl()}/users/${userId}/enderecos`);
    if (res.ok) {
      const extras = await res.json();
      setEnderecosExtras(Array.isArray(extras) ? extras : []);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
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

      {/* Botão para mostrar/ocultar endereços extras */}
      <Pressable
        style={[styles.botaoSalvar, { marginTop: 20, backgroundColor: mostrarExtras ? '#ccc' : '#007bff' }]}
        onPress={() => setMostrarExtras((v) => !v)}
      >
        <Text style={styles.textoBotao}>{mostrarExtras ? 'Ocultar Endereços Extras' : 'Ver Endereços Extras'}</Text>
      </Pressable>

      {/* Só mostra os endereços extras se mostrarExtras for true */}
      {mostrarExtras && (
        <View style={{ width: '100%' }}>
          <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Endereços Extras</Text>
          {enderecosExtras.length === 0 && (
            <Text style={{ textAlign: 'center', marginTop: 10 }}>Nenhum endereço extra cadastrado.</Text>
          )}
          {enderecosExtras.map((item, idx) => (
            <Text key={idx} style={styles.input}>{item}</Text>
          ))}
          <TextInput
            value={rua}
            onChangeText={setRua}
            placeholder="Rua"
            style={styles.input}
          />
          <TextInput
            value={numero}
            onChangeText={setNumero}
            placeholder="Número"
            style={styles.input}
            keyboardType="numeric"
          />
          <TextInput
            value={complemento}
            onChangeText={setComplemento}
            placeholder="Complemento"
            style={styles.input}
          />
          <TextInput
            value={bairro}
            onChangeText={setBairro}
            placeholder="Bairro"
            style={styles.input}
          />
          <TextInput
            value={cidade}
            onChangeText={setCidade}
            placeholder="Cidade"
            style={styles.input}
          />
          <TextInput
            value={estado}
            onChangeText={setEstado}
            placeholder="Estado"
            style={styles.input}
          />
          <TextInput
            value={cep}
            onChangeText={setCep}
            placeholder="CEP"
            style={styles.input}
            keyboardType="numeric"
            maxLength={8}
          />
          <Pressable onPress={handleAdicionarEnderecoExtra} style={styles.botaoSalvar}>
            <Text style={styles.textoBotao}>Adicionar Endereço Extra</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}
