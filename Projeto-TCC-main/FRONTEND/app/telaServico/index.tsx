import { ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '@/src/components/telaServico/header/indes';
import { Corpo } from '@/src/components/telaServico/corpo';

export default function TelaServico() {
  const { servi } = useLocalSearchParams();
  const service = JSON.parse(servi as string);

  return (
    <ScrollView
    showsVerticalScrollIndicator={false}
    showsHorizontalScrollIndicator={false}
    className="flex-1 bg-slate-100 px-4 pt-4">

        <Header/>
        <Corpo service={service}/>    
    </ScrollView>
  );
}
