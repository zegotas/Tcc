import React from 'react';
import { View, Text,TouchableOpacity, ScrollView } from 'react-native';
import { styles } from '../../../src/pages/home/servicos/style';


export default function Servicos() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seus Serviços Iniciados</Text>

      <ScrollView contentContainerStyle={styles.lista}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Serviço 1</Text>
          <Text style={styles.cardDesc}>Descrição do serviço iniciado...</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Serviço 2</Text>
          <Text style={styles.cardDesc}>Outro serviço que você começou...</Text>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.botao}>
        <Text style={styles.botaoTexto}>Adicionar Novo Serviço</Text>
      </TouchableOpacity>
    </View>

      

  );
}


