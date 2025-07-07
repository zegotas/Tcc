const mongoose = require('mongoose');

const servicoSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  titulo: { type: String, required: true },
  descricao: { type: String, required: true },
  categoria: String,
  subcategoria: String,
  dataCriacao: { type: Date, default: Date.now },
  cep: String,
  cidade: String,
  tipoPagamento: String,
  valor: String,
  servicoPermuta: String,
  fotos: [String], // array de URLs/base64
});

module.exports = mongoose.model('Servico', servicoSchema);
