import { Feather } from '@expo/vector-icons';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';


interface Props {
  onSearch: (termo: string) => void;
}

export function PesquisarServi({ onSearch }: Props) {
  const [busca, setBusca] = useState('');

  return (
    <View className='w-full flex-row border border-slate-500 h-14 rounded-full items-center gap-2 px-4 mt-2 bg-transparent'>
      <Feather name='search' size={24} color={'#64748b'} />

      <TextInput
        className='flex-1 bg-transparent text-black'
        placeholder='Pesquisar serviços'
        value={busca}
        onChangeText={setBusca}
        onSubmitEditing={() => onSearch(busca)} // ao pressionar Enter
        returnKeyType="search"
      />

      <TouchableOpacity onPress={() => onSearch(busca)}>
        <Feather name="arrow-right" size={20} color="#64748b" />
      </TouchableOpacity>
    </View>
  );
}
