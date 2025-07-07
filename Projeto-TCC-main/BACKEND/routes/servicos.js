const express = require('express');
const router = express.Router();
const Servico = require('../models/Servico');

// Criar novo serviço
router.post('/', async (req, res) => {
  try {
    const novoServico = new Servico(req.body);
    const salvo = await novoServico.save();
    res.status(201).json(salvo);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Buscar todos os serviços
router.get('/', async (req, res) => {
  try {
    const servicos = await Servico.find();
    res.json(servicos);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

module.exports = router;