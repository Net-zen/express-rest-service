const winston = require('winston');
require('winston-daily-rotate-file');

const infoTransport = options =>
  new winston.transports.DailyRotateFile({
    ...options,
    level: 'info',
    filename: `${__dirname}/../logs/rest-service-info-%DATE%.log`
  });

const errorTransport = options =>
  new winston.transports.DailyRotateFile({
    ...options,
    level: 'error',
    filename: `${__dirname}/../logs/rest-service-ERRORS-%DATE%.log`
  });

const timestampFormat = () =>
  new Date().toLocaleString('ru-RU', {
    timeZone: 'Asia/Omsk',
    hour12: false
  });

const options = {
  file: {
    handleExceptions: true,
    json: true,
    datePattern: 'DD-MM-YYYY',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '30d'
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true
  }
};

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(options.console),
    infoTransport(options.file),
    errorTransport(options.file)
  ],
  format: winston.format.combine(
    winston.format.combine(),
    winston.format.timestamp({
      format: timestampFormat
    }),
    winston.format.printf(
      info => `[${info.timestamp}] ${info.level}: ${info.message}`
    )
  ),
  exitOnError: false
});

logger.stream = {
  write(message) {
    logger.info(message);
  }
};

module.exports = logger;
