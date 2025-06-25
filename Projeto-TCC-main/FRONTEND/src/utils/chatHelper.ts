import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { getApiUrl } from '../global/api';

// Busca o userId do usuário logado salvo no AsyncStorage
export async function getUserId() {
  return await AsyncStorage.getItem('userId');
}

// Cria (ou busca) o chatId entre dois usuários e navega para a tela de chat
export async function goToChatWithUser(anuncianteId: string, anuncianteNome: string, anuncianteFoto: string) {
  const userId = await getUserId();
  console.log('goToChatWithUser chamado', { userId, anuncianteId, anuncianteNome, anuncianteFoto });
  if (!userId || !anuncianteId) return;
  try {
    // Cria ou busca o chat no backend
    const token = await AsyncStorage.getItem('token'); // ou o nome do seu token
    const res = await fetch(`${getApiUrl()}/chats`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // <-- Adicione esta linha
      },
      body: JSON.stringify({ userId1: userId, userId2: anuncianteId })
    });
    const chat = await res.json();
    console.log('Resposta do backend (chat):', chat);
    if (chat && chat._id) {
      // LOG DETALHADO DE PARTICIPANTES
      console.log('[CHAT HELPER] participantes recebidos:', chat.participantes);
      // Descobre quem é o outro participante (receiver) de forma robusta
      let receiverId = anuncianteId;
      if (chat.participantes && Array.isArray(chat.participantes)) {
        // Participantes pode ser array de objetos {_id} ou de strings
        const outro = chat.participantes.find((p: any) => {
          if (typeof p === 'string') return p !== userId;
          if (p && p._id) return p._id !== userId;
          return false;
        });
        if (outro) receiverId = typeof outro === 'string' ? outro : outro._id;
      }
      console.log('[CHAT HELPER] Navegando para chat:', { chatId: chat._id, userId, receiverId, participantes: chat.participantes });
      router.push({
        pathname: '/chat/[chatId]',
        params: {
          chatId: chat._id,
          userId,
          receiverId,
          anuncianteNome,
          anuncianteFoto
        }
      });
    } else {
      alert('Chat não encontrado ou criado.');
    }
  } catch (e) {
    alert('Erro ao abrir chat');
    console.log('Erro ao abrir chat:', e);
  }
}
