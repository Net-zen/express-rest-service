const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../common/config');
const logger = require('../common/logger');

const connectToDB = cb => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });

  const db = mongoose.connection;
  db.on('error', () => logger.error('connection error:'));
  db.once('open', () => {
    console.log("we're connected!");
    // db.dropDatabase();
    cb();
  });
};

module.exports = connectToDB;
