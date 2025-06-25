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
  const [enderecoPrincipal, setEnderecoPrincipal] = useState<any>(null);
  const [enderecos, setEnderecos] = useState<any[]>([]); // todos os endereços do usuário

  // Função para buscar todos os dados do backend (usando /users e filtro por id)
  const fetchUserData = async (id: string) => {
    const res = await fetch(`${getApiUrl()}/users`);
    const users = await res.json();
    const user = users.find((u: any) => u._id === id);
    if (user) {
      setNome(user.nome || '');
      setCpf(user.cpfCnpj || '');
      setGenero(user.genero || '');
      setData(user.dataNascimento ? formatarData(user.dataNascimento) : '');
      if (user.endereco) setEnderecoPrincipal(user.endereco); // sempre objeto
      else setEnderecoPrincipal(null);
      // Busca todos os endereços (principal + extras)
      let lista: any[] = [];
      if (user.endereco) lista.push(user.endereco);
      if (Array.isArray(user.enderecosExtras)) lista = lista.concat(user.enderecosExtras);
      setEnderecos(lista);
    }
  };

  useEffect(() => {
    AsyncStorage.getItem('userId').then(async (id) => {
      if (!id) return;
      setUserId(id);
      fetchUserData(id); // Busca todos e filtra pelo id
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

  // Função utilitária para mostrar o endereço resumido no Picker
  function formatEnderecoLabel(end: any) {
    if (!end) return '-';
    return `${end.rua || ''}, ${end.numero || ''} - ${end.bairro || ''}, ${end.cidade || ''}`;
  }

  function formatarEndereco(end: any) {
    if (!end) return '';
    return `${end.rua || ''}, ${end.numero || ''} - ${end.bairro || ''}, ${end.cidade || ''} - ${end.estado || ''}, ${end.cep || ''}`;
  }

  // No handleEditarSalvar, atualizar apenas genero e endereco principal
  const handleEditarSalvar = async () => {
    if (isEditing) {
      await fetch(`${getApiUrl()}/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          genero,
          endereco: enderecoPrincipal // sempre objeto
        }),
      });
      Toast.show({ type: 'success', text1: 'Informações salvas!' });
      if (userId) fetchUserData(userId);
    }
    setIsEditing(!isEditing);
  };

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
              <Text style={styles.text}>{nome}</Text>
              <Text style={styles.textTittleCpf}>CPF</Text>
              <TextInput
                style={styles.input}
                value={cpf}
                editable={false}
              />
            </View>
            <View style={styles.caixa2}>
              <Text style={styles.textTitleData}>Data de Nascimento</Text>
              <Text style={styles.text}>{data}</Text>
              <Text style={styles.textTitleEnde}>Endereço Principal</Text>
              {isEditing && enderecos.length > 1 ? (
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={enderecos.findIndex(e => JSON.stringify(e) === JSON.stringify(enderecoPrincipal))}
                    onValueChange={(idx) => setEnderecoPrincipal(enderecos[idx])}
                    style={styles.picker}
                  >
                    {enderecos.map((end, idx) => (
                      <Picker.Item key={idx} label={formatEnderecoLabel(end)} value={idx} />
                    ))}
                  </Picker>
                </View>
              ) : enderecoPrincipal ? (
                <View style={{ backgroundColor: '#f2f2f2', borderRadius: 8, padding: 12, marginBottom: 10, borderWidth: 1, borderColor: '#e0e0e0' }}>
                  <Text style={{ fontWeight: 'bold', marginBottom: 2 }}>Rua:</Text>
                  <Text style={{ marginBottom: 4 }}>{enderecoPrincipal.rua || '-'}</Text>
                  <Text style={{ fontWeight: 'bold', marginBottom: 2 }}>Número:</Text>
                  <Text style={{ marginBottom: 4 }}>{enderecoPrincipal.numero || '-'}</Text>
                  {enderecoPrincipal.complemento && <><Text style={{ fontWeight: 'bold', marginBottom: 2 }}>Complemento:</Text><Text style={{ marginBottom: 4 }}>{enderecoPrincipal.complemento}</Text></>}
                  <Text style={{ fontWeight: 'bold', marginBottom: 2 }}>Bairro:</Text>
                  <Text style={{ marginBottom: 4 }}>{enderecoPrincipal.bairro || '-'}</Text>
                  <Text style={{ fontWeight: 'bold', marginBottom: 2 }}>Cidade:</Text>
                  <Text style={{ marginBottom: 4 }}>{enderecoPrincipal.cidade || '-'}</Text>
                  <Text style={{ fontWeight: 'bold', marginBottom: 2 }}>Estado:</Text>
                  <Text style={{ marginBottom: 4 }}>{enderecoPrincipal.estado || '-'}</Text>
                  <Text style={{ fontWeight: 'bold', marginBottom: 2 }}>CEP:</Text>
                  <Text>{enderecoPrincipal.cep || '-'}</Text>
                </View>
              ) : (
                <Text style={styles.text}>Nenhum endereço cadastrado.</Text>
              )}
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
