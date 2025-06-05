import { View, Pressable, Text } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { router } from 'expo-router';
import Constants from 'expo-constants';

const statusBarHeight = Constants.statusBarHeight;

export function DrawerButton() {
  const navigation = useNavigation();
  return (
    <View 
    style={{marginTop: statusBarHeight}}
    className= 'w-full flex flex-row items-center justify-between'>
      <Pressable
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        className='w-10 h-10 rounded-full flex justify-center items-center'>
          <Ionicons 
          name="menu-outline" size={20} color="#121212" />
      </Pressable>
      </View>
  );
}   