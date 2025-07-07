const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /usuarios/:id/avaliar
router.post('/:id/avaliar', async (req, res) => {
  try {
    const usuarioId = req.params.id;
    const { nota } = req.body;

    if (nota < 1 || nota > 5) {
      return res.status(400).json({ erro: 'Nota inválida. Use de 1 a 5.' });
    }

    const usuario = await User.findById(usuarioId);
    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado.' });
    }

    const totalNotas = usuario.reputacao.media * usuario.reputacao.votos;
    const novaVotacao = usuario.reputacao.votos + 1;
    const novaMedia = (totalNotas + nota) / novaVotacao;

    usuario.reputacao.media = novaMedia;
    usuario.reputacao.votos = novaVotacao;

    await usuario.save();

    res.json({
      mensagem: 'Avaliação registrada com sucesso.',
      reputacaoAtualizada: usuario.reputacao
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro interno ao avaliar usuário.' });
  }
});

module.exports = router;
