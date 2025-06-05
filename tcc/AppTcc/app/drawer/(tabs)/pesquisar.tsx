import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { styles } from '../../../src/pages/home/pesquisar/styles';

export default function Pesquisar() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar Serviços</Text>
      <TextInput style={styles.input} placeholder="Buscar por serviços..." />
      <Button title="Aplicar Filtros" onPress={() => {}} />
    </View>
  );
}

