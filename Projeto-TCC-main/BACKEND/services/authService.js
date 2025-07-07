const User = require('../models/User');
const jwt = require('jsonwebtoken');

async function login(email, senha) {
  const user = await User.findOne({ email });
  if (!user || user.senha !== senha) {
    throw new Error('Credenciais inválidas');
  }
  const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || 'segredo', { expiresIn: '7d' });
  return { token, user };
}

module.exports = { login };
