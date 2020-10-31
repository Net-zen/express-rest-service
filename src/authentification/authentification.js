const jwt = require('jsonwebtoken');
const { UNAUTHORIZED } = require('../common/errorHandler');
const { JWT_SECRET_KEY } = require('../common/config');

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new UNAUTHORIZED('Wrong authenticate scheme!');
  }
  if (authHeader.split(' ')[0] !== 'Bearer') {
    throw new UNAUTHORIZED('Wrong authenticate scheme!');
  }
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) throw new UNAUTHORIZED('Failed to authenticate token');

  try {
    jwt.verify(token, JWT_SECRET_KEY);
  } catch (e) {
    throw new UNAUTHORIZED('Failed to authenticate token');
  }
  next();
};

module.exports = authenticateToken;
