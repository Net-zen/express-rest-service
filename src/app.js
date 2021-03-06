const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const loginRouter = require('./resources/login/login.router');
const morgan = require('morgan');
const logger = require('./common/logger');
const { errorHandler } = require('./errors/errorHandler');
const helmet = require('helmet');
const cors = require('cors');
const authenticateToken = require('./authentification/authentification');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(
  morgan(
    ':protocol :http-version :ip :method :status :url ' +
      'query: :query ' +
      'body: :body size :user-agent :res[content-length] - :response-time ms',
    { stream: logger.stream }
  )
);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/login', loginRouter);

app.use(authenticateToken);

app.use('/users', userRouter);
app.use('/boards', boardRouter);
boardRouter.use('/:boardId/tasks', taskRouter);

app.use(errorHandler);

module.exports = app;
