import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../../src/pages/home/perfil/styles';
import { router } from 'expo-router';
import DrawerButton from '@/src/components/DrawerButton';

export default function Perfil() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/perfil/informacoesPessoais')}>
      <Text style={styles.buttonText}>Informações Pessoais</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/perfil/dadosConta')}>
      <Text style={styles.buttonText}>Dados da Conta</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/perfil/endereco')}>
      <Text style={styles.buttonText}>Endereços</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/perfil/pagamentos')}>
      <Text style={styles.buttonText}>Pagamentos</Text>
      </TouchableOpacity>
    </View>
  );
}


