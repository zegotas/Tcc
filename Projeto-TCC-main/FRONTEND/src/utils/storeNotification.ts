import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveNotification(notification: any) {
  try {
    const existing = await AsyncStorage.getItem('notifications');
    const parsed = existing ? JSON.parse(existing) : [];
    parsed.unshift(notification); // adiciona no topo
    await AsyncStorage.setItem('notifications', JSON.stringify(parsed));
  } catch (e) {
    console.error('Erro ao salvar notificação:', e);
  }
}

export async function getNotifications() {
  const saved = await AsyncStorage.getItem('notifications');
  return saved ? JSON.parse(saved) : [];
}

export async function clearNotifications() {
  await AsyncStorage.removeItem('notifications');
}
