import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Sair() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      await AsyncStorage.clear(); // Limpa todos os dados salvos
      router.replace('/'); // Redireciona para a tela de login
    };
    logout();
  }, []);

  return <View />;
}
