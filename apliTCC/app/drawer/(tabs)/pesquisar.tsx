import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { CardHorizontalServi } from '../../../src/components/BuscarServicos/servi';
import { ServicoProps } from '@/src/components/BuscarServicos';

export default function Pesquisar() {
  const [servicos, setServicos] = useState<ServicoProps[]>([]);
  const [busca, setBusca] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('');
  const [filtroSubtipo, setFiltroSubtipo] = useState('');
  const [tiposDisponiveis, setTiposDisponiveis] = useState<string[]>([]);
  const [subtiposDisponiveis, setSubtiposDisponiveis] = useState<string[]>([]);

  useEffect(() => {
    fetch('http://192.168.0.7:3000/services')
      .then((res) => res.json())
      .then((data: ServicoProps[]) => {
        setServicos(data);
        const tipos = [...new Set(data.map((s) => s.type))];
        setTiposDisponiveis(tipos);
      });
  }, []);

  useEffect(() => {
    if (filtroTipo) {
      const subtipos = [
        ...new Set(
          servicos
            .filter((s) => s.type === filtroTipo)
            .map((s) => (s as any).subtype || '')
            .filter(Boolean)
        ),
      ];
      setSubtiposDisponiveis(subtipos);
    } else {
      setSubtiposDisponiveis([]);
    }
  }, [filtroTipo]);

  const servicosFiltrados = servicos.filter((servico) => {
    const nomeMatch = servico.name?.toLowerCase().includes(busca.toLowerCase());
    const tipoMatch = filtroTipo ? servico.type === filtroTipo : true;
    const subtipoMatch = filtroSubtipo
      ? (servico as any).subtype === filtroSubtipo
      : true;
    return nomeMatch && tipoMatch && subtipoMatch;
  });

  return (
    <ScrollView className="flex-1 bg-white px-4 pt-4">
      <Text className="text-2xl font-bold mb-4">Buscar Serviços</Text>

      <TextInput
        placeholder="Buscar por nome..."
        className="border rounded-lg px-3 py-2 mb-3"
        value={busca}
        onChangeText={setBusca}
      />

      <Text className="font-semibold mb-1">Tipos de Serviços</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-3">
        <View className="flex-row gap-2">
          {tiposDisponiveis.map((item) => (
            <TouchableOpacity
              key={item}
              className={`px-4 py-2 rounded-full ${
                filtroTipo === item ? 'bg-blue-500' : 'bg-gray-200'
              }`}
              onPress={() => {
                setFiltroTipo(filtroTipo === item ? '' : item);
                setFiltroSubtipo('');
              }}
            >
              <Text
                className={`text-sm font-medium ${
                  filtroTipo === item ? 'text-white' : 'text-gray-800'
                }`}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {filtroTipo ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-3">
          <View className="flex-row gap-2">
            {subtiposDisponiveis.map((item) => (
              <TouchableOpacity
                key={item}
                className={`px-4 py-2 rounded-full ${
                  filtroSubtipo === item ? 'bg-blue-500' : 'bg-gray-200'
                }`}
                onPress={() => setFiltroSubtipo(filtroSubtipo === item ? '' : item)}
              >
                <Text
                  className={`text-sm font-medium ${
                    filtroSubtipo === item ? 'text-white' : 'text-gray-800'
                  }`}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      ) : null}

      {servicosFiltrados.map((item) => (
        <View key={item.id} className="mb-4">
          <CardHorizontalServi servi={item} />
        </View>
      ))}

      {servicosFiltrados.length === 0 && (
        <Text className="text-gray-500 mt-6 text-center">Nenhum serviço encontrado.</Text>
      )}
    </ScrollView>
  );
}
