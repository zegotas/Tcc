require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const users = await User.find({ email: { $in: [
    'marcos@fake.com',
    'joaquina@fake.com',
    'flaviane@fake.com',
    'andres@fake.com',
    'pauliho@fake.com',
    'ariane@fake.com'
  ] } });
  console.log(users.map(u => ({
    nome: u.nome,
    email: u.email,
    _id: u._id.toString()
  })));
  process.exit();
});