const chatService = require('../services/chatService');

exports.createChat = async (req, res) => {
  const { userId1, userId2 } = req.body;
  try {
    let chat = await chatService.createChat(userId1, userId2);
    // Força populate para garantir que participantes venha como objeto
    chat = await chat.populate('participantes', 'nome email');
    res.json(chat);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.listChats = async (req, res) => {
  try {
    const chats = await chatService.listChats(req.params.userId);
    res.json(chats);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.listMessages = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const mensagens = await chatService.listMessages(req.params.chatId, page, limit);
    res.json(mensagens);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const mensagem = await chatService.sendMessage(req.body);
    res.status(201).json(mensagem);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    await chatService.deleteMessage(req.params.id);
    res.json({ sucesso: true });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
