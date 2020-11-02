const jwt = require('jsonwebtoken');
const { UNAUTHORIZED } = require('../errors/errors');
const { JWT_SECRET_KEY } = require('../common/config');

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new UNAUTHORIZED('Wrong authenticate scheme!');
  }
  const [type, token] = authHeader.split(' ');
  if (type !== 'Bearer') {
    throw new UNAUTHORIZED('Wrong authenticate scheme!');
  }
  if (!token) {
    throw new UNAUTHORIZED('Failed to authenticate token');
  }

  try {
    jwt.verify(token, JWT_SECRET_KEY);
  } catch (e) {
    throw new UNAUTHORIZED('Failed to authenticate token');
  }
  next();
};

module.exports = authenticateToken;
