const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const { logger, logWriter } = require('./common/winston-cfg');
const { errorHandler } = require('./common/errorHandler');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use(logWriter);

process.on('uncaughtException', error => {
  logger.error(`error.message = ${JSON.stringify(error.message)}:`);
  logger.info('Process terminated');
  const { pid } = process;
  logger.on('finish', () => process.kill(pid));
});

process.on('unhandledRejection', reason => {
  logger.error(`error.message = ${JSON.stringify(reason.message)}`);
  logger.info('Process terminated');
  const { pid } = process;
  logger.on('finish', () => process.kill(pid));
});

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);

app.use('/boards', boardRouter);

boardRouter.use('/:boardId/tasks', taskRouter);

app.use(errorHandler);

// throw Error('Oops');

// Promise.reject(Error('Oops!'));

module.exports = app;
