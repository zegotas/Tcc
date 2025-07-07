require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const connectDB = require('./config/db');
const setupSocket = require('./config/socket');
const mongoose = require('mongoose');
const app = express();

app.use(cors());
app.use(express.json());

// Rotas
const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);
const servicoRoutes = require('./routes/servicos');
app.use('/api/servicos', servicoRoutes);
const emailRoutes = require('./routes/email');
app.use('/api/email', emailRoutes);
const chatRoutes = require('./routes/chat');
app.use('/api', chatRoutes);
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
const comentariosRoutes = require('./routes/comentarios');
app.use('/api/comentarios', comentariosRoutes);

// Conexão com MongoDB
connectDB();

const { Server } = require('socket.io');  // Importa o Server do socket.io

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*', // Ajuste para seu domínio na produção
    methods: ['GET', 'POST'],
  },
  transports: ['websocket', 'polling'], // para evitar erro xhr poll
});

// Passa a instância io para configurar os eventos
setupSocket(io);

server.listen(3001, '0.0.0.0', () => {
  console.log('Servidor rodando na porta 3001');
});

server.listen(3001, '0.0.0.0', () => {
  console.log('Servidor rodando na porta 3001');
});
