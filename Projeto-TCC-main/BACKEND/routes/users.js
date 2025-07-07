// routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Criar novo usuário
router.post('/', async (req, res) => {
  try {
    const novoUsuario = new User(req.body);
    const salvo = await novoUsuario.save();
    res.status(201).json(salvo);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Buscar todos os usuários
router.get('/', async (req, res) => {
  try {
    const usuarios = await User.find();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Buscar usuário por id
router.get('/:id', async (req, res) => {
  try {
    const usuario = await User.findById(req.params.id);
    if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Atualizar endereço do usuário
router.put('/:id/endereco', async (req, res) => {
  try {
    const usuario = await User.findByIdAndUpdate(
      req.params.id,
      { endereco: req.body },
      { new: true }
    );
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Excluir endereço do usuário
router.delete('/:id/endereco', async (req, res) => {
  try {
    const usuario = await User.findByIdAndUpdate(
      req.params.id,
      { $unset: { endereco: "" } },
      { new: true }
    );
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Atualizar cartão de crédito/débito do usuário
router.put('/:id/cartao', async (req, res) => {
  try {
    const update = {};
    if (req.body.cartaoCredito) update.cartaoCredito = req.body.cartaoCredito;
    if (req.body.cartaoDebito) update.cartaoDebito = req.body.cartaoDebito;

    const usuario = await User.findByIdAndUpdate(
      req.params.id,
      { $set: update },
      { new: true }
    );
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Atualizar dados da conta do usuário (nome, email, celular, emailRecuperacao, genero)
router.put('/:id', async (req, res) => {
  try {
    const update = {};
    if (req.body.nome) update.nome = req.body.nome;
    if (req.body.email) update.email = req.body.email;
    if ('celular' in req.body) update.celular = req.body.celular;
    if (req.body.emailRecuperacao) update.emailRecuperacao = req.body.emailRecuperacao;
    if ('genero' in req.body) update.genero = req.body.genero;
    if (req.body.endereco) update.endereco = req.body.endereco;

    const usuario = await User.findByIdAndUpdate(
      req.params.id,
      { $set: update },
      { new: true }
    );
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Listar endereços extras do usuário
router.get('/:id/enderecos', async (req, res) => {
  try {
    const usuario = await User.findById(req.params.id);
    res.json(usuario.enderecosExtras || []);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Adicionar endereço extra ao usuário
router.post('/:id/enderecos', async (req, res) => {
  try {
    const usuario = await User.findById(req.params.id);
    if (!usuario.enderecosExtras) usuario.enderecosExtras = [];
    usuario.enderecosExtras.push(req.body.endereco);
    await usuario.save();
    res.json(usuario.enderecosExtras);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Remover endereço extra pelo índice
router.delete('/:id/enderecos/:idx', async (req, res) => {
  try {
    const usuario = await User.findById(req.params.id);
    if (usuario.enderecosExtras && usuario.enderecosExtras.length > req.params.idx) {
      usuario.enderecosExtras.splice(req.params.idx, 1);
      await usuario.save();
    }
    res.json(usuario.enderecosExtras || []);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

module.exports = router;
