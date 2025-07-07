require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Chat = require('./models/Chat');
const Mensagem = require('./models/Mensagem');

const userIds = [
  '6850eaa19c32e7ae61ce07ae', // Marcos
  '6850eaa19c32e7ae61ce07b1', // Joaquina
  '6850eaa19c32e7ae61ce07b4', // Flaviane
  '6850eaa19c32e7ae61ce07b7', // Andres
  '6850eaa19c32e7ae61ce07ba', // Pauliho
  '6850eaa19c32e7ae61ce07bd', // Ariane
];

const mensagensExemplo = [
  'Olá! Tudo bem?',
  'Tenho interesse no seu serviço.',
  'Qual o valor?',
  'Posso agendar para amanhã?',
  'Obrigado pelo retorno!',
  'Até breve!'
];

async function seedChats() {
  await mongoose.connect(process.env.MONGODB_URI);

  // Cria chats entre todos os pares de usuários
  for (let i = 0; i < userIds.length; i++) {
    for (let j = i + 1; j < userIds.length; j++) {
      const userA = userIds[i];
      const userB = userIds[j];
      // Verifica se já existe chat
      let chat = await Chat.findOne({
        $or: [
          { users: [userA, userB] },
          { users: [userB, userA] }
        ]
      });
      if (!chat) {
        chat = await Chat.create({ users: [userA, userB] });
        console.log(`Chat criado entre ${userA} e ${userB}`);
      }
      // Adiciona mensagens automáticas
      for (let k = 0; k < 3; k++) {
        const sender = k % 2 === 0 ? userA : userB;
        const receiver = k % 2 === 0 ? userB : userA;
        await Mensagem.create({
          chatId: chat._id,
          senderId: sender,
          receiverId: receiver,
          texto: mensagensExemplo[(i + j + k) % mensagensExemplo.length],
          createdAt: new Date(Date.now() - (3 - k) * 60 * 60 * 1000) // Horas atrás
        });
      }
      console.log(`Mensagens automáticas criadas para chat ${chat._id}`);
    }
  }
  await mongoose.disconnect();
  console.log('Conversas automáticas criadas!');
}

seedChats();
