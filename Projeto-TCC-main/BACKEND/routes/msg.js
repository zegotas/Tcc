const express = require('express');
const mongoose = require('mongoose');
const Mensagem = require('./models/Mensagem');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Conexão com MongoDB
mongoose.connect('SUA_STRING_DE_CONEXÃO', {
  // as opções abaixo são desnecessárias em versões novas:
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
}).then(() => {
  console.log('Conectado ao MongoDB');
}).catch((err) => {
  console.error('Erro na conexão MongoDB:', err);
});

// ✅ ROTA PARA SALVAR MENSAGEM
app.post('/mensagens', async (req, res) => {
  try {
    const novaMensagem = new Mensagem({
      remetente: req.body.remetente,
      conteudo: req.body.conteudo
    });

    await novaMensagem.save();
    res.status(201).json({ mensagem: 'Mensagem salva com sucesso!' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao salvar mensagem', detalhes: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
