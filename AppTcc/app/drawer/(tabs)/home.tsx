import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, Image, Pressable } from 'react-native';
import { styles } from '../../../src/pages/home/inicio/styles';
import { Ionicons } from '@expo/vector-icons';
import DrawerButton from '@/src/components/DrawerButton';

export default function Home() {
  const [dadosServicos, setDadosServicos] = useState<{ id: string; titulo: string; preco: string; local: string; data: string; imagem: string; }[]>([]);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    // Simulando chamada da API para buscar os serviços quando estiver com o banco de dados
    async function fetchServicos() {
      // Aqui você substituiria pela sua chamada real da API
      const dadosMock = [
        {
          id: '1',
          titulo: 'Instalação de ar-condicionado',
          preco: 'R$ 100',
          local: 'Paraiba do Sul - RJ',
          data: '13/04/2025',
          imagem: require('../../../src/assets/ar.png'),
        },
        {
          id: '2',
          titulo: 'Bolo de Aniversário',
          preco: 'Faxina ou Limpeza',
          local: 'Niterói - RJ',
          data: '17/04/2025',
          imagem: require('../../../src/assets/bolo.png'),
        },
      ];
      setDadosServicos(dadosMock);
    }

    fetchServicos();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          placeholder="Buscar"
          value={busca}
          onChangeText={setBusca}
          style={styles.input}
        />
      </View>

      <FlatList
        data={dadosServicos.filter(item =>
          item.titulo.toLowerCase().includes(busca.toLowerCase())
        )}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Pressable style={styles.card}>
            <Image
                  source={typeof item.imagem === 'string' ? { uri: item.imagem } : item.imagem}
                  style={styles.cardImage}
            />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.titulo}</Text>
              <Text style={styles.cardPrice}>{item.preco}</Text>
              <Text style={styles.cardInfo}>{item.local}</Text>
              <Text style={styles.cardInfo}>{item.data}</Text>
            </View>
          </Pressable>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}