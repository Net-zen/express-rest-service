const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../common/config');
const logger = require('../common/logger');
const { createAdmin } = require('../resources/users/user.db.repository');

const connectToDB = cb => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });

  const db = mongoose.connection;
  db.on('error', error => logger.error(`connection error: ${error.message}`));
  db.once('open', () => {
    logger.info("we're connected to DB!");
    db.dropDatabase();
    createAdmin();
    cb();
  });
};

module.exports = connectToDB;
