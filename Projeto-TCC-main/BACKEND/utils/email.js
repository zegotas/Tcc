const nodemailer = require('nodemailer');

async function sendMail({ to, subject, text, html }) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  return transporter.sendMail({ from: process.env.EMAIL_USER, to, subject, text, html });
}

module.exports = { sendMail };
