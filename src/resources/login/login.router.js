const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { JWT_SECRET_KEY } = require('../../common/config');
const { UNAUTHORIZED, FORBIDDEN } = require('../../common/errorHandler');
const { getByLogin } = require('../users/user.service');
require('express-async-errors');

router.route('/').post(async (req, res) => {
  const user = await getByLogin(req.body);
  if (!user) throw new FORBIDDEN('Bad username/password combination');
  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) throw new UNAUTHORIZED('Bad username/password combination');
  const payload = { userId: user.id, login: user.login };
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: 1800000 });
  res.send({ token });
});

module.exports = router;
