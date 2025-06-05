import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { styles } from '../../src/pages/perfil/endereco/styles';
import { useLocalSearchParams } from 'expo-router';



export default function Endereco() {
  const router = useRouter();

  const [enderecoPrincipal, setEnderecoPrincipal] = useState('Rua das Flores, 123 - Centro, SP');
  const [enderecosExtras, setEnderecosExtras] = useState([
    'Av. Paulista, 1000 - Bela Vista, SP',
    'Rua dos Pinheiros, 321 - Pinheiros, SP',
  ]);

  const tornarPrincipal = (novoPrincipal: string) => {
    const novaListaExtras = [
      enderecoPrincipal,
      ...enderecosExtras.filter(end => end !== novoPrincipal),
    ];

    setEnderecoPrincipal(novoPrincipal);
    setEnderecosExtras(novaListaExtras);
  };

  const params = useLocalSearchParams();

useEffect(() => {
  if (params.novoEndereco) {
    const novo = String(params.novoEndereco);
    if (!enderecosExtras.includes(novo) && novo !== enderecoPrincipal) {
      setEnderecosExtras(prev => [...prev, novo]);
    }
  }
}, [params.novoEndereco]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Endereço Principal</Text>
      <View style={styles.enderecoBoxPrincipal}>
        <Text style={styles.enderecoTexto}>{enderecoPrincipal}</Text>
      </View>

      {enderecosExtras.length > 0 && (
        <>
          <Text style={styles.titulo}>Outros Endereços</Text>
          {enderecosExtras.map((end, index) => (
            <View key={index} style={styles.enderecoBox}>
              <Text style={styles.enderecoTexto}>{end}</Text>
              <Pressable
                style={styles.botaoTornarPrincipal}
                onPress={() => tornarPrincipal(end)}
              >
                <Text style={styles.textoBotao}>Tornar Principal</Text>
              </Pressable>
            </View>
          ))}
        </>
      )}

      <Pressable
        style={styles.botaoAdicionar}
        onPress={() => router.push('/perfil/cadastEnd')}
      >
        <Text style={styles.textoBotaoAdicionar}>Adicionar Endereço</Text>
      </Pressable>
    </ScrollView>
  );
}
