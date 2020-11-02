const router = require('express').Router();
const { FORBIDDEN } = require('../../errors/errors');
const signToken = require('./login.service');
require('express-async-errors');

router.route('/').post(async (req, res) => {
  const token = await signToken(req.body);
  if (!token) {
    throw new FORBIDDEN('Bad username/password combination');
  }
  res.send(token);
});

module.exports = router;
