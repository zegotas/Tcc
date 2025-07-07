// models/Mensagem.js
const mongoose = require('mongoose');

const mensagemSchema = new mongoose.Schema({
  chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  conteudo: { type: String },
  image: { type: String },
  data: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Mensagem', mensagemSchema);
