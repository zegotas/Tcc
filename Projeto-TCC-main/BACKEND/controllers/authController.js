const authService = require('../services/authService');

exports.login = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const result = await authService.login(email, senha);
    res.json(result);
  } catch (err) {
    res.status(401).json({ erro: err.message });
  }
};
