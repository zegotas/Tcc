const { Server } = require('socket.io');
const Mensagem = require('./models/Mensagem');
const Chat = require('./models/Chat');
const chatService = require('./services/chatService');

function setupSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log('Socket conectado:', socket.id);
    // Entrar em uma sala de chat
    socket.on('join', (chatId) => {
      console.log(`Socket ${socket.id} entrou na sala ${chatId}`);
      socket.join(chatId);
    });

    // Sair de uma sala de chat
    socket.on('leave', (chatId) => {
      console.log(`Socket ${socket.id} saiu da sala ${chatId}`);
      socket.leave(chatId);
    });

    // Receber mensagem e repassar para sala
    socket.on('sendMessage', async (data) => {
      console.log('Socket recebeu sendMessage:', data); // Log para depuração
      const mensagemSalva = await chatService.sendMessage(data);
      const { chatId } = data;
      io.to(chatId).emit('newMessage', mensagemSalva); // Envia a mensagem real salva
      console.log('Emitido newMessage para sala', chatId, mensagemSalva);
    });
  });
}

module.exports = setupSocket;
