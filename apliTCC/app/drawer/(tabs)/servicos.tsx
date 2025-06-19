import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { styles } from '../../../src/pages/home/servicos/style';
import BtnCriar from '@/src/components/criarServi/btnCriar';


interface Servico {
  _id: string;
  titulo: string;
  descricao: string;
}

export default function Servicos() {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const router = useRouter();

  async function buscarServicos() {
    try {
      const response = await fetch('http://10.0.2.2:3000/api/servicos');
      const data = await response.json();
      setServicos(data);
    } catch (error) {
      console.error('Erro ao buscar serviços:', error);
    }
  }

  useEffect(() => {
    buscarServicos();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seus serviços iniciados</Text>

      <ScrollView contentContainerStyle={styles.lista}>
        {servicos.length === 0 ? (
          <Text style={{ textAlign: 'center', color: 'gray' }}>
            Você ainda não iniciou nenhum serviço.
          </Text>
        ) : (
          servicos.map((servico) => (
            <View key={servico._id} style={styles.card}>
              <Text style={styles.cardTitle}>{servico.titulo}</Text>
              <Text style={styles.cardDesc}>{servico.descricao}</Text>
            </View>
          ))
        )}
      </ScrollView>

      <BtnCriar onPress={() => router.push('/criar/Criarservico')} />
    </View>
  );
}
