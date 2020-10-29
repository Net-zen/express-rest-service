const router = require('express').Router();
require('express-async-errors');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');
const { UNAUTHORIZED } = require('../../common/errorHandler');
const { getByLogin } = require('../users/user.service');
require('express-async-errors');

router.route('/').post(async (req, res) => {
  const user = await getByLogin(req.body);
  if (!user || user.password !== req.body.password) {
    throw new UNAUTHORIZED('Bad username/password combination');
  }
  const payload = { userId: user.id, login: user.login };
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: 1800 });
  res.send({ token });
});

module.exports = router;
