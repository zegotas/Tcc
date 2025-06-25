import { io } from 'socket.io-client';
import { getApiUrl } from './api';

const socket = io(getApiUrl().replace('/api', ''));

socket.on('connect', () => {
  console.log('[FRONT] Socket conectado:', socket.id);
});
socket.on('disconnect', () => {
  console.log('[FRONT] Socket desconectado');
});
socket.on('connect_error', (err) => {
  console.log('[FRONT] Erro de conexão socket:', err);
});

export default socket;
