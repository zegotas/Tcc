const express = require('express');
// const auth = require('../middlewares/auth');
// const { validate, body, param, query } = require('../middlewares/validate');
const chatController = require('../controllers/chatController');

const router = express.Router();

router.use((req, res, next) => {
  console.log('Rota /chat acessada:', req.method, req.originalUrl);
  next();
});

// Criar novo chat
// router.post('/chats',
//   auth,
//   validate([
//     body('userId1').isString(),
//     body('userId2').isString()
//   ]),
//   chatController.createChat
// );
// --- Para teste, sem auth/validate:
router.post('/chats', chatController.createChat);

// Listar chats de um usuário
// router.get('/chats/:userId',
//   auth,
//   validate([
//     param('userId').isString()
//   ]),
//   chatController.listChats
// );
router.get('/chats/:userId', chatController.listChats);

// Listar mensagens de um chat (com paginação)
// router.get('/mensagens/:chatId',
//   auth,
//   validate([
//     param('chatId').isString(),
//     query('page').optional().isInt({ min: 1 }),
//     query('limit').optional().isInt({ min: 1, max: 100 })
//   ]),
//   chatController.listMessages
// );
router.get('/mensagens/:chatId', chatController.listMessages);

// Enviar mensagem
// router.post('/mensagens',
//   auth,
//   validate([
//     body('chatId').isString(),
//     body('senderId').isString(),
//     body('receiverId').isString(),
//     body('conteudo').optional().isString(),
//     body('image').optional().isString()
//   ]),
//   chatController.sendMessage
// );
router.post('/mensagens', chatController.sendMessage);

// Deletar mensagem
// router.delete('/mensagens/:id',
//   auth,
//   validate([
//     param('id').isString()
//   ]),
//   chatController.deleteMessage
// );
router.delete('/mensagens/:id', chatController.deleteMessage);

module.exports = router;
