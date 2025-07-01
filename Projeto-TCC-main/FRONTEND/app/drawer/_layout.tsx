import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
  screenOptions={({ navigation }) => ({
    headerTitle: '',
    headerShown: false,
    headerStyle: {
      height: 50,
      elevation: 0,
      shadowOpacity: 0,
    },
    headerLeft: () => (
      <Ionicons
        name="menu"
        size={24}
        color="black"
        style={{ marginLeft: 15 }}
        onPress={() => navigation.openDrawer()}
      />
    ),
    drawerStyle: {
      backgroundColor: 'white',
      width: '50%',
    }
  })}
>
        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerLabel: 'Início',  
            drawerIcon: ({ color }) => (
              <Ionicons name="home-outline" size={20} color={color} /> 
            ),
          }}
        />
        <Drawer.Screen
          name="perfil"
          options={{
            drawerLabel: 'Perfil',
            drawerIcon: ({ color }) => (
              <Ionicons name="person-outline" size={20} color={color} /> 
            ),
          }}
        />
        <Drawer.Screen
          name="ChatListScreen"
          options={{
            drawerLabel: 'Conversas',
            drawerIcon: ({ color }) => (
              <Ionicons name="chatbubble-outline" size={20} color={color} /> 
            ),
          }}
        />                
        <Drawer.Screen
          name="favoritos"
          options={{
            drawerLabel: 'Favoritos',
            drawerIcon: ({ color }) => (
              <Ionicons name="heart-outline" size={20} color={color} /> 
            ),
          }}
        />
        <Drawer.Screen
          name="sair"
          options={{
            drawerLabel: 'Sair',
            drawerIcon: ({ color }) => (
              <Ionicons name="log-out-outline" size={20} color={color} /> 
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
