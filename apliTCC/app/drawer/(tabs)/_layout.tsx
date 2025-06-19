import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import '../../../global.css'

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = 'home-outline';
          if (route.name === 'home') iconName = 'home-outline';
          else if (route.name === 'pesquisar') iconName = 'search-outline';
          else if (route.name === 'servicos') iconName = 'briefcase-outline';

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#3A98FF',
        tabBarInactiveTintColor: '#000',
        headerShown: false,
        
      })}
    >
      <Tabs.Screen name="home" options={{ title: 'Início' }} />
      <Tabs.Screen name="pesquisar" options={{ title: 'Pesquisar' }} />
      <Tabs.Screen name="servicos" options={{ title: 'Serviços' }} />
    </Tabs>
  );
}
