import AsyncStorage from '@react-native-async-storage/async-storage';
import { ServicoProps } from '../../src/utils/ServicoProps';

const STORAGE_KEY = 'FAVORITOS_SERVICOS';

export async function adicionarFavorito(servico: ServicoProps) {
  const favoritos = await buscarFavoritos();
  const novoFavoritos = [...favoritos, servico];
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novoFavoritos));
}

export async function removerFavorito(id: string) {
  const favoritos = await buscarFavoritos();
  const atualizados = favoritos.filter((s) => s.id !== id);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(atualizados));
}

export async function isFavorito(id: string) {
  const favoritos = await buscarFavoritos();
  return favoritos.some((s) => s.id === id);
}

export async function buscarFavoritos(): Promise<ServicoProps[]> {
  const json = await AsyncStorage.getItem(STORAGE_KEY);
  return json ? JSON.parse(json) : [];
}

export async function limparFavoritos() {
  await AsyncStorage.removeItem('FAVORITOS_SERVICOS');
}
