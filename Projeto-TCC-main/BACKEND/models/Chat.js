const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  participantes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
  criadoEm: { type: Date, default: Date.now },
  ultimoUpdate: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Chat', chatSchema);
