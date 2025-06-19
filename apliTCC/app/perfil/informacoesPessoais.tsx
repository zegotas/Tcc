import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApiUrl } from '../../src/global/api';
import { styles } from '../../src/pages/perfil/infPessoais/styles';
import { toastConfig } from '@/src/components/toastConfig';

export default function InformacoesPessoais() {
  const [isEditing, setIsEditing] = useState(false);
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [data, setData] = useState('');
  const [genero, setGenero] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const [enderecoPrincipal, setEnderecoPrincipal] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('userId').then(async (id) => {
      if (!id) return;
      setUserId(id);
      const res = await fetch(`${getApiUrl()}/users`);
      const users = await res.json();
      const user = users.find((u: any) => u._id === id);
      if (user) {
        setNome(user.nome);
        setCpf(user.cpfCnpj);
        setGenero(user.genero || '');
        setData(user.dataNascimento ? formatarData(user.dataNascimento) : '');
        // --- ADICIONE ESTA LINHA PARA BUSCAR O ENDEREÇO PRINCIPAL ---
        if (user.endereco) {
          setEnderecoPrincipal(formatarEndereco(user.endereco));
        }
      }
    });
  }, []);

  function formatarData(dataISO: string) {
    const d = new Date(dataISO);
    const dia = String(d.getDate()).padStart(2, '0');
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const ano = d.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  const aplicarMascaraData = (texto: string) => {
    let limpo = texto.replace(/\D/g, '');
    if (limpo.length > 2) limpo = limpo.replace(/^(\d{2})/, '$1/');
    if (limpo.length > 5) limpo = limpo.replace(/^(\d{2})\/(\d{2})/, '$1/$2/');
    setData(limpo);
  };

  const validarData = (data: string) => {
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    return regex.test(data);
  };

  const handleEditarSalvar = async () => {
    if (isEditing && !validarData(data)) {
      Toast.show({
        type: 'error',
        text1: 'Data inválida',
        text2: 'Digite a data no formato dd/mm/aaaa',
      });
      return;
    }
    if (isEditing) {
      const [dia, mes, ano] = data.split('/');
      const dataISO = `${ano}-${mes}-${dia}`;
      await fetch(`${getApiUrl()}/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          genero,
          dataNascimento: dataISO,
        }),
      });
      Toast.show({ type: 'success', text1: 'Informações salvas!' });
    }
    setIsEditing(!isEditing);
  };

  function formatarEndereco(end: any) {
    if (!end) return '';
    return `${end.rua || ''}, ${end.numero || ''} - ${end.bairro || ''}, ${end.cidade || ''} - ${end.estado || ''}, ${end.cep || ''}`;
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            <View style={styles.caixa1}>
              <Text style={styles.textTittle}>Nome Completo</Text>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={nome}
                  onChangeText={setNome}
                />
              ) : (
                <Text style={styles.text}>{nome}</Text>
              )}

              <Text style={styles.textTittleCpf}>CPF</Text>
              <TextInput
                style={styles.input}
                value={cpf}
                editable={false}
              />
            </View>

            <View style={styles.caixa2}>
              <Text style={styles.textTitleData}>Data de Nascimento</Text>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={data}
                  onChangeText={aplicarMascaraData}
                  keyboardType="numeric"
                  maxLength={10}
                  placeholder="dd/mm/aaaa"
                />
              ) : (
                <Text style={styles.text}>{data}</Text>
              )}

              <Text style={styles.textTitleEnde}>Endereço</Text>
              <TextInput
                style={styles.input}
                value={enderecoPrincipal}
                editable={false}
              />

              <Text style={styles.textTitleGen}>Gênero</Text>
              {isEditing ? (
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={genero}
                    onValueChange={(itemValue) => setGenero(itemValue)}
                    style={styles.picker}
                  >
                    <Picker.Item label="Feminino" value="Feminino" />
                    <Picker.Item label="Masculino" value="Masculino" />
                    <Picker.Item label="Outros" value="Outros" />
                  </Picker>
                </View>
              ) : (
                <Text style={styles.text}>{genero}</Text>
              )}

              <Pressable style={styles.botaoSalvar} onPress={handleEditarSalvar}>
                <Text style={styles.textAlterar}>{isEditing ? 'Salvar' : 'Editar'}</Text>
              </Pressable>
            </View>

            <Toast config={toastConfig} />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
