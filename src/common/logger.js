const winston = require('winston');
require('winston-daily-rotate-file');
const morgan = require('morgan');

morgan.token('body', req =>
  JSON.stringify(
    req.body.password ? { ...req.body, password: '******' } : req.body
  )
);

morgan.token('query', req => JSON.stringify(req.query));

morgan.token('ip', req => JSON.stringify(req.ip));

morgan.token('protocol', req => JSON.stringify(req.protocol));

morgan.token('host', req => req.headers.host);

const options = {
  file: {
    json: true,
    datePattern: 'DD-MM-YYYY',
    handleExceptions: true,
    handleRejections: true,
    zippedArchive: true,
    maxSize: '5m',
    maxFiles: '7d'
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    handleRejections: true,
    json: false,
    colorize: true
  }
};

const infoTransport = new winston.transports.DailyRotateFile({
  ...options.file,
  level: 'info',
  filename: `${__dirname}/../logs/rest-service-info-%DATE%.log`
});

const errorTransport = new winston.transports.DailyRotateFile({
  ...options.file,
  level: 'error',
  filename: `${__dirname}/../logs/rest-service-ERRORS-%DATE%.log`
});

const timestampFormat = () =>
  new Date().toLocaleString('ru-RU', {
    timeZone: 'Asia/Omsk',
    hour12: false
  });

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(options.console),
    infoTransport,
    errorTransport
  ],
  format: winston.format.combine(
    winston.format.combine(),
    winston.format.timestamp({
      format: timestampFormat
    }),
    winston.format.printf(
      info => `[${info.timestamp} UTC+6] ${info.level}: ${info.message}`
    )
  ),
  exitOnError: true
});

logger.stream = {
  write(message) {
    logger.info(message);
  }
};

module.exports = logger;
