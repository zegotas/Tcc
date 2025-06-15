import { View, Pressable, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export function Header() {
  const navigation = useNavigation();
  return (
    <View className='w-full flex flex-row items-center justify-between'>
      <Pressable
        onPress={() => navigation.goBack()}
        className='w-10 h-10 rounded-full flex justify-center items-center'>
          <Ionicons 
          name="arrow-back-outline" size={20} color="#121212" />
      </Pressable>
    </View>
  );
}