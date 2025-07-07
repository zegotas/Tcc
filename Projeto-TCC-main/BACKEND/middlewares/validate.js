const { body, validationResult, param, query } = require('express-validator');

const validate = (validations) => async (req, res, next) => {
  await Promise.all(validations.map(validation => validation.run(req)));
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  res.status(400).json({ erros: errors.array() });
};

module.exports = { validate, body, param, query };
