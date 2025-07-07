import { Stack } from 'expo-router';

export default function PerfilLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: 'center',
        headerShown: false
      }}
    >
      <Stack.Screen name="informacoesPessoais" options={{ title: "Informações Pessoais" }} />
      <Stack.Screen name="dadosConta" options={{ title: "Dados da Conta" }} />
      <Stack.Screen name="endereco" options={{ title: "Endereços" }} />
      <Stack.Screen name="excluirEnd" options={{ title: "Excluir Endereço" }} />
      <Stack.Screen name="cadastEnd" options={{ title: "Cadastro de Endereço" }} />
      <Stack.Screen name="pagamentos" options={{title: "Pagamentos"}}/>
    </Stack>
  );
}
