import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInputMask } from 'react-native-masked-text';
import { styles } from '../../src/pages/perfil/dadosConta/styles';
import { toastConfig } from '@/src/components/toastConfig';
import { getApiUrl } from '@/src/global/api';

import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { router } from 'expo-router';
const statusBarHeight = Constants.statusBarHeight;

export default function DadosConta() {
  const [isEditing, setIsEditing] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const [email, setEmail] = useState('');
  const [emailRecuperacao, setEmailRecuperacao] = useState('');
  const [usuario, setUsuario] = useState('');
  const [celular, setCelular] = useState('');

  // Buscar dados reais do usuário
  useEffect(() => {
    async function fetchUser() {
      const id = await AsyncStorage.getItem('userId');
      if (!id) return;
      setUserId(id);

      try {
        const res = await fetch(`${getApiUrl()}/users`);
        const users = await res.json();
        const user = users.find((u: any) => u._id === id);
        if (user) {
          setEmail(user.email || '');
          setUsuario(user.nome || '');
          setCelular(user.celular || '');
          setEmailRecuperacao(user.emailRecuperacao || '');
        }
      } catch (err) {
        Alert.alert('Erro', 'Não foi possível carregar os dados do usuário.');
      }
    }
    fetchUser();
  }, []);

  const validarEmail = (email: string) => {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
  };

  const validarCelular = (cel: string) => {
    const numeros = cel.replace(/\D/g, '');
    return numeros.length >= 10 && numeros.length <= 11;
  };

  const handleEditarSalvar = async () => {
    if (isEditing) {
      if (!validarEmail(email)) {
        Toast.show({
          type: 'error',
          text1: 'Email inválido',
          text2: 'Verifique o formato, o email deve conter @ e um domínio válido.', 
        });
        return;
      }
      if (emailRecuperacao && !validarEmail(emailRecuperacao)) {
        Toast.show({
          type: 'error',
          text1: 'Email de recuperação inválido',
          text2: 'Verifique o formato do email de recuperação.',
        });
        return;
      }
      if (!validarCelular(celular)) {
        Toast.show({
          type: 'error',
          text1: 'Celular inválido',
          text2: 'Verifique o número de telefone.',
        });
        return;
      }

      // Salvar no backend
      try {
        await fetch(`${getApiUrl()}/users/${userId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            nome: usuario,
            celular,
            emailRecuperacao,
          }),
        });
        Toast.show({
          type: 'success',
          text1: 'Dados salvos com sucesso!',
        });
      } catch (err) {
        Toast.show({
          type: 'error',
          text1: 'Erro ao salvar dados!',
        });
      }
    }
    setIsEditing(!isEditing);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Pressable 
          className='px-4 mb-2'
          style={{ marginTop: statusBarHeight }}
          onPress={() => router.navigate('/drawer/perfil')}
        >
            <Ionicons  name="arrow-back-outline" size={20} color="#121212" />
      </Pressable>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <View style={styles.caixa1}>
              <Text style={styles.titlleEmail}>Email</Text>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              ) : (
                <Text style={styles.textEmail}>{email}</Text>
              )}

              <Text style={styles.titlleEmail}>Email de Recuperação</Text>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={emailRecuperacao}
                  onChangeText={setEmailRecuperacao}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholder="Opcional"
                />
              ) : (
                <Text style={styles.textEmail}>{emailRecuperacao || 'Não cadastrado'}</Text>
              )}

              <Text style={styles.titlleCel}>Celular</Text>
              {isEditing ? (
                <TextInputMask
                  type={'cel-phone'}
                  options={{
                    maskType: 'BRL',
                    withDDD: true,
                    dddMask: '(99) '
                  }}
                  value={celular}
                  onChangeText={setCelular}
                  style={styles.input}
                  keyboardType="phone-pad"
                />
              ) : (
                <Text style={styles.textCel}>{celular}</Text>
              )}
            </View>

            <View style={styles.caixa2}>
              <Text style={styles.titlleUsu}>Nome do Usuário</Text>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={usuario}
                  onChangeText={setUsuario}
                />
              ) : (
                <Text style={styles.textUsu}>{usuario}</Text>
              )}

              <Pressable style={styles.botaoSalvar} onPress={handleEditarSalvar}>
                <Text style={styles.textAlterar}>
                  {isEditing ? 'Salvar' : 'Editar'}
                </Text>
              </Pressable>
            </View>

            <Toast config={toastConfig} />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}