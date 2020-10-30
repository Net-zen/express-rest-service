const logger = require('./common/logger');
const { PORT } = require('./common/config');
const app = require('./app');
const connectToDB = require('./db/db.client');

connectToDB(() =>
  app.listen(PORT, () =>
    logger.info(`App is running on http://localhost:${PORT}`)
  )
);
