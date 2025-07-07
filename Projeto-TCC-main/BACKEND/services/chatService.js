const Chat = require('../models/Chat');
const Mensagem = require('../models/Mensagem');

async function createChat(userId1, userId2) {
  console.log('chatService.createChat chamado:', { userId1, userId2 });
  let chat = await Chat.findOne({ participantes: { $all: [userId1, userId2], $size: 2 } });
  if (!chat) {
    chat = new Chat({ participantes: [userId1, userId2] });
    await chat.save();
  }
  // Sempre popula os participantes ao retornar
  chat = await Chat.findById(chat._id).populate('participantes', 'nome email');
  console.log('Chat encontrado/criado (populado):', chat);
  return chat;
}

// Novo: retorna os chats com a última mensagem de cada um
async function listChats(userId) {
  const chats = await Chat.find({ participantes: userId })
    .populate('participantes', 'nome email')
    .sort({ ultimoUpdate: -1 });

  // Buscar a última mensagem de cada chat
  const chatsWithLastMsg = await Promise.all(
    chats.map(async chat => {
      const lastMsg = await Mensagem.findOne({ chatId: chat._id }).sort({ data: -1 });
      return {
        ...chat.toObject(),
        ultimaMensagem: lastMsg ? { conteudo: lastMsg.conteudo || lastMsg.text || '' } : null,
      };
    })
  );
  return chatsWithLastMsg;
}

async function listMessages(chatId, page = 1, limit = 20) {
  const mensagens = await Mensagem.find({ chatId })
    .sort({ data: 1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));
  return mensagens.map(m => {
    if (m.image && !m.image.startsWith('data:image')) {
      return { ...m.toObject(), image: `data:image/jpeg;base64,${m.image}` };
    }
    return m;
  });
}

async function sendMessage({ chatId, senderId, receiverId, conteudo, image }) {
  const mensagem = new Mensagem({ chatId, senderId, receiverId, conteudo, image });
  await mensagem.save();
  await Chat.findByIdAndUpdate(chatId, { ultimoUpdate: new Date() });
  console.log('Mensagem salva:', mensagem);
  return mensagem;
}

async function deleteMessage(id) {
  const mensagem = await Mensagem.findById(id);
  if (!mensagem) throw new Error('Mensagem não encontrada');
  await mensagem.deleteOne();
  return true;
}

module.exports = {
  createChat,
  listChats,
  listMessages,
  sendMessage,
  deleteMessage
};
