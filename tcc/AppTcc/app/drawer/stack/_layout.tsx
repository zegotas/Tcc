import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Mensagens from './mensagens';
import Conversas from './conversas';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Mensagens" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Mensagens" component={Mensagens} />
      <Stack.Screen name="Conversas" component={Conversas} />
    </Stack.Navigator>
  );
}
