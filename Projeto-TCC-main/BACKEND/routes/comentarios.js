const express = require('express');
const router = express.Router();
const Comentario = require('../models/Comentario');
const User = require('../models/User');

// Buscar comentários de um anunciante
router.get('/:anuncianteId', async (req, res) => {
  try {
    const comentarios = await Comentario.find({ anuncianteId: req.params.anuncianteId }).sort({ criadoEm: -1 });
    res.json(comentarios);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Adicionar comentário a um anunciante
router.post('/:anuncianteId', async (req, res) => {
  console.log('[COMENTARIO POST] Body recebido:', req.body);
  try {
    const { texto, autor, nota, imagem } = req.body;
    const novo = new Comentario({
      anuncianteId: req.params.anuncianteId,
      texto,
      autor: autor || 'Usuário',
      nota,
      imagem
    });
    await novo.save();
    // Atualiza reputação do anunciante se nota enviada
    if (nota && nota >= 1 && nota <= 5) {
      const usuario = await User.findById(req.params.anuncianteId);
      if (usuario) {
        const totalNotas = (usuario.reputacao?.media || 0) * (usuario.reputacao?.votos || 0);
        const novaVotacao = (usuario.reputacao?.votos || 0) + 1;
        const novaMedia = (totalNotas + nota) / novaVotacao;
        usuario.reputacao = {
          media: novaMedia,
          votos: novaVotacao
        };
        await usuario.save();
      }
    }
    // Retorna lista atualizada
    const comentarios = await Comentario.find({ anuncianteId: req.params.anuncianteId }).sort({ criadoEm: -1 });
    res.status(201).json(comentarios);
  } catch (err) {
    console.error('[COMENTARIO POST ERROR]', err);
    res.status(500).json({ erro: err.message });
  }
});

module.exports = router;
