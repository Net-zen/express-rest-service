const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { JWT_SECRET_KEY } = require('../../common/config');
const { UNAUTHORIZED, FORBIDDEN } = require('../../errors/errors');
const usersRepo = require('../users/user.db.repository');

const signToken = async requestedUser => {
  const user = await usersRepo.getByLogin(requestedUser);
  if (!user) {
    throw new FORBIDDEN('Bad username/password combination');
  }
  const match = await bcrypt.compare(requestedUser.password, user.password);
  if (!match) {
    throw new UNAUTHORIZED('Bad username/password combination');
  }
  const payload = { userId: user.id, login: user.login };
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: 180 });
  return token && { token };
};

module.exports = signToken;
