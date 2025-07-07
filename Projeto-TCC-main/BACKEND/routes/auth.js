const express = require('express');
const { validate, body } = require('../middlewares/validate');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/login',
  validate([
    body('email').isEmail(),
    body('senha').isString()
  ]),
  authController.login
);

module.exports = router;
