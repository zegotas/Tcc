import { View, Pressable, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


import Constants from 'expo-constants';
import { router } from 'expo-router';
const statusBarHeight = Constants.statusBarHeight;

export function Voltar() {
  const navigation = useNavigation();
  return (
    <View 
        style={{marginTop: statusBarHeight}}
        className='bg-transparent px-4'>
      <Pressable
        onPress={() => router.back()}
        className='w-10 h-10 rounded-full '>
          <Ionicons  name="arrow-back-outline" size={20} color="#121212" />
      </Pressable>
    </View>
  );
}