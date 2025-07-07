const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  cpfCnpj: { type: String, required: true, unique: true },
  dataNascimento: { type: Date, required: true },
  senha: { type: String, required: true },
  cartaoCredito: {
    numero: String,
    nomeTitular: String,
    validade: String,
    cvv: String
  },
  cartaoDebito: {
    numero: String,
    nomeTitular: String,
    validade: String,
    cvv: String
  },
  endereco: {
    rua: String,
    numero: String,
    complemento: String,
    bairro: String,
    cidade: String,
    estado: String,
    cep: String
  },
  reputacao: {
    media: { type: Number, default: 0 },
    votos: { type: Number, default: 0 }
  },
  genero: { type: String },
  celular: { type: String },
  emailRecuperacao: { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
