const logger = require('./logger');

const errorHandler = (err, req, res, next) => {
  if (
    err instanceof NOT_FOUND ||
    err instanceof UNAUTHORIZED ||
    err instanceof FORBIDDEN
  ) {
    res.status(err.status).send(err.message);
  } else {
    logger.error(`error.status: 500 : error: ${err.stack || err.message}`);
    res.status(500).send("Okay, Houston, we've had a problem here.");
  }
  next();
};

class NOT_FOUND extends Error {
  constructor(message) {
    super(message);
    this.status = '404';
    this.message = message;
  }
}

class FORBIDDEN extends Error {
  constructor(message) {
    super(message);
    this.status = '403';
    this.message = message;
  }
}

class UNAUTHORIZED extends Error {
  constructor(message) {
    super(message);
    this.status = '401';
    this.message = message;
  }
}

module.exports = { errorHandler, NOT_FOUND, FORBIDDEN, UNAUTHORIZED };
