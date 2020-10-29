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

  jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
    if (err) throw new UNAUTHORIZED('Failed to authenticate token');
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
