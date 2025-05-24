import React, { useState } from 'react';
import { Text, TextInput, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { styles } from '../../src/pages/perfil/endereco/styles';
import Toast from 'react-native-toast-message';
import { toastConfig } from '@/src/components/toastConfig';

export default function CadastEnd() {
  const router = useRouter();

  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [cep, setCep] = useState('');

  const showError = (campo: string) => {
    Toast.show({
      type: 'error',
      text1: `O campo "${campo}" é obrigatório.`,
    });
  };

  const handleSalvar = () => {
    if (!rua.trim()) return showError('Rua');
    if (!numero.trim()) return showError('Número');
    if (!bairro.trim()) return showError('Bairro');
    if (!cidade.trim()) return showError('Cidade');
    if (!estado.trim()) return showError('Estado');
    if (!cep.trim()) return showError('CEP');

    const enderecoCompleto = `${rua}, ${numero} - ${bairro}, ${cidade} - ${estado}`;

    router.replace({
      pathname: '/perfil/endereco',
      params: { novoEndereco: enderecoCompleto },
    });
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
        onChangeText={(text) => {
          const onlyNumbers = text.replace(/[^0-9]/g, '');
          setNumero(onlyNumbers);
        }}
        keyboardType="numeric"
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
        onChangeText={(text) => {
          const onlyNumbers = text.replace(/[^0-9]/g, '');
          setCep(onlyNumbers);
        }}
        keyboardType="numeric"
        maxLength={8}
      />

      <Pressable style={styles.botaoSalvar} onPress={handleSalvar}>
        <Text style={styles.textoBotao}>Salvar Endereço</Text>
      </Pressable>

      <Toast config={toastConfig} />
    </ScrollView>
  );
}
