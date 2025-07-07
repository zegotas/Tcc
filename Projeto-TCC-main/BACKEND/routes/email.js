const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Configure o transporte (exemplo com Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'marcos.2410290431015@aluno.cvttrs.faetec.rj.gov.br', // <-- aqui
    pass: 'svaf qllj sizn wgli', // Use senha de app, não sua senha normal!
  },
});

router.post('/send-recovery', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email é obrigatório' });

  try {
    await transporter.sendMail({
      from: '"Recuperação" <marcos.2410290431015@aluno.cvttrs.faetec.rj.gov.br>', // <-- aqui
      to: email,
      subject: 'Recuperação de senha',
      text: 'Recebemos sua solicitação. Em breve você poderá redefinir sua senha.',
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao enviar email' });
  }
});

module.exports = router;