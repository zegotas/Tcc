const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const users = [
  {
    nome: 'Marcos Eletricista',
    email: 'marcos@fake.com',
    cpfCnpj: '11111111111',
    dataNascimento: new Date('1980-01-01'),
    senha: '123456',
  },
  {
    nome: 'Joaquina Limpeza',
    email: 'joaquina@fake.com',
    cpfCnpj: '22222222222',
    dataNascimento: new Date('1985-02-02'),
    senha: '123456',
  },
  {
    nome: 'Flaviane Bem Viver',
    email: 'flaviane@fake.com',
    cpfCnpj: '33333333333',
    dataNascimento: new Date('1990-03-03'),
    senha: '123456',
  },
  {
    nome: 'Andres Soluções',
    email: 'andres@fake.com',
    cpfCnpj: '44444444444',
    dataNascimento: new Date('1982-04-04'),
    senha: '123456',
  },
  {
    nome: 'Pauliho Aulas',
    email: 'pauliho@fake.com',
    cpfCnpj: '55555555555',
    dataNascimento: new Date('1995-05-05'),
    senha: '123456',
  },
  {
    nome: 'Ariane Teacher',
    email: 'ariane@fake.com',
    cpfCnpj: '66666666666',
    dataNascimento: new Date('1998-06-06'),
    senha: '123456',
  }
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  for (const user of users) {
    const exists = await User.findOne({ email: user.email });
    if (!exists) {
      await User.create(user);
      console.log('Usuário fake criado:', user.email);
    } else {
      console.log('Usuário já existe:', user.email);
    }
  }
  await mongoose.disconnect();
  console.log('Finalizado!');
}

seed();
