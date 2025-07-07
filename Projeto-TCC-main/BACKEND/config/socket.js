const setupSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('[BACKEND] Novo usuário conectado:', socket.id);

    // Usuário entra numa sala de chat específica
    socket.on('join', (chatId) => {
      socket.join(chatId);
      console.log(`[BACKEND] Usuário ${socket.id} entrou na sala ${chatId}`);
    });

    // Usuário sai da sala
    socket.on('leave', (chatId) => {
      socket.leave(chatId);
      console.log(`[BACKEND] Usuário ${socket.id} saiu da sala ${chatId}`);
    });

    // Envio de nova mensagem
    socket.on('sendMessage', async (messageData) => {
      console.log('[BACKEND] Recebendo sendMessage:', messageData);
      const { chatId, senderId, receiverId, conteudo, image } = messageData;

      // Salvar no banco
      const Mensagem = require('../models/Mensagem');
      const novaMensagem = new Mensagem({
        chatId,
        senderId,
        receiverId,
        conteudo,
        image,
        timestamp: new Date(),
      });
      await novaMensagem.save();

      // Emitir para quem está na sala
      io.to(chatId).emit('newMessage', novaMensagem);

      // ✅ Atualizar a lista de chats para todos os usuários
      io.emit('chatUpdated', { chatId });
    });

    socket.on('disconnect', () => {
      console.log('[BACKEND] Usuário desconectado:', socket.id);
    });
  });
};

module.exports = setupSocket;
