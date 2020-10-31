const logger = require('../common/logger');

const errorHandler = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send(err.message);
  } else {
    logger.error(`error.status: 500 : error: ${err.stack || err.message}`);
    res.status(500).send("Okay, Houston, we've had a problem here.");
  }
  next();
};

module.exports = { errorHandler };
