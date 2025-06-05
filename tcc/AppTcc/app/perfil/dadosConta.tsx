import React, { useState } from 'react';
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
} from 'react-native';
import Toast from 'react-native-toast-message';
import { TextInputMask } from 'react-native-masked-text';
import { styles } from '../../src/pages/perfil/dadosConta/styles';
import { toastConfig } from '@/src/components/toastConfig';

export default function DadosConta() {
  const [isEditing, setIsEditing] = useState(false);

  const [email, setEmail] = useState('exemplo@email.com');
  const [usuario, setUsuario] = useState('Joao da Silva');
  const [celular, setCelular] = useState('(11) 91234-5678');

  const validarEmail = (email: string) => {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
  };

  const validarCelular = (cel: string) => {
    const numeros = cel.replace(/\D/g, '');
    return numeros.length >= 10 && numeros.length <= 11;
  };

  const handleEditarSalvar = () => {
    if (isEditing) {
      if (!validarEmail(email)) {
        Toast.show({
          type: 'error',
          text1: 'Email inválido',
          text2: 'Verifique o formato, o email deve conter @ e um domínio válido.', 
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

      Toast.show({
        type: 'success',
        text1: 'Dados salvos com sucesso!',
      });
    }
    setIsEditing(!isEditing);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
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