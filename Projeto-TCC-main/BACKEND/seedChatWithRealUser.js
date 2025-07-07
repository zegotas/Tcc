require('dotenv').config();
const mongoose = require('mongoose');
const Chat = require('./models/Chat');
const User = require('./models/User');
const Mensagem = require('./models/Mensagem');

// Substitua pelo seu _id real e de um fake
const realUserId = '6857501652df8355b96f021b'; // Seu usuário
const fakeUserId = '6850eaa19c32e7ae61ce07ae'; // Marcos Eletricista

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  let chat = await Chat.findOne({ participantes: { $all: [realUserId, fakeUserId], $size: 2 } });
  if (!chat) {
    chat = await Chat.create({ participantes: [realUserId, fakeUserId] });
    console.log('Chat criado:', chat._id);
  } else {
    console.log('Chat já existia:', chat._id);
  }
  // Mensagem de exemplo
  await Mensagem.create({
    chatId: chat._id,
    senderId: fakeUserId,
    receiverId: realUserId,
    conteudo: 'Olá! Bem-vindo ao chat de exemplo.',
    data: new Date()
  });
  await mongoose.disconnect();
  console.log('Chat e mensagem de exemplo criados!');
}

seed();
