import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const Perfil = () => (
  <View>
    <Text>Informações Pessoais</Text>
    <Text>Dados da Conta</Text>
    <Text>Endereços</Text>
    <Text>Pagamentos</Text>
  </View>
);

export default function Home() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case 'Início': iconName = 'home'; break;
            case 'Pesquisar': iconName = 'search'; break;
            case 'Serviços': iconName = 'construct'; break;
            case 'Perfil': iconName = 'person'; break;
            default: iconName = 'ellipse';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF6C00',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >

      <Tab.Screen name="Perfil" component={Perfil} />
    </Tab.Navigator>
  );
}
