import { View, Pressable, Text } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { router } from 'expo-router';

export function Header() {
  const navigation = useNavigation();
  return (
    <View className= 'w-full flex flex-row items-center justify-between'>
      <Pressable
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        className='w-10 h-10 rounded-full flex justify-center items-center'>
          <Ionicons 
          name="menu-outline" size={20} color="#121212" />
      </Pressable>

    <View className='flex flex-col items-center justify-center'>
       <Text className='text-center text-sm text-slate-800'>Localização</Text> 

       <View className='flex flex-row items-center justify-center gap-1'>
        <Feather name="map-pin" size={14} color="red" />
        <Text className='text-lg font-bold'>Três Rios</Text>
       </View>
    </View>

    <Pressable 
    onPress={() => router.push('/notifications')}
    className='w-10 h-10 rounded-full flex justify-center items-center'>
        <Feather name="bell" size={20} color="#121212" />
    </Pressable>
    
   </View>
  );
}