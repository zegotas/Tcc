import { Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../pages/home/servicos/style';
import { router } from 'expo-router';

export default function BtnCriar() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      className='bg-sky-500 rounded-full items-center justify-center h-10'
      onPress={() => router.push('/criar/Criarservico')}
    >
      <Text style={styles.botaoTexto}>Adicionar Novo Serviço</Text>
    </TouchableOpacity>
  );
}
