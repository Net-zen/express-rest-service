const winston = require('winston');
require('winston-daily-rotate-file');

const options = {
  file: {
    handleExceptions: false,
    json: true,
    datePattern: 'DD-MM-YYYY',
    zippedArchive: true,
    maxSize: '5m',
    maxFiles: '7d'
  },
  console: {
    level: 'debug',
    handleExceptions: false,
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
      info => `[${info.timestamp}] ${info.level}: ${info.message}`
    )
  ),
  exitOnError: false
});

logger.exit = pid => {
  infoTransport.on('finish', () => process.kill(pid));
  infoTransport.close();
};

const logWriter = (req, res, next) => {
  const { protocol, ip, body, url, query, method } = req;
  const timeStart = Date.now();
  res.on('finish', () => {
    const delay = Date.now() - timeStart;
    logger.info(`${ip} : ${
      res.statusCode
    } : ${delay}ms : ${method} : ${url} : ${protocol}
query = ${JSON.stringify(query)}
body = ${JSON.stringify(body)}
`);
  });
  next();
};

module.exports = { logger, logWriter };
