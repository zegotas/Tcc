const mongoose = require('mongoose');

const comentarioSchema = new mongoose.Schema({
  anuncianteId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  texto: { type: String, required: true },
  autor: { type: String }, // Pode ser preenchido depois com autenticação
  criadoEm: { type: Date, default: Date.now },
  nota: { type: Number, min: 1, max: 5 },
  imagem: { type: String } // base64 opcional
});

module.exports = mongoose.model('Comentario', comentarioSchema);
