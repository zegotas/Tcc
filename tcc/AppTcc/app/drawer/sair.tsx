import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View } from 'react-native';

export default function Sair() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/');
  }, []);

  return <View />;
}
