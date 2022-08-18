import { createLogger, transports, format } from "winston";
var winston = require('winston');
require('winston-daily-rotate-file');

  var transport = new winston.transports.DailyRotateFile({
    colorize: false,
    timestamp: true,
    datePattern: 'YYYY-MM-DD-HH-mm',
    filename: 'application-%DATE%.log',
    dirname: './src/dailylog/',
    maxFiles: 2,
    zippedArchive: false,
    json: true,
    level: 'info',
    format: format.combine(format.timestamp(), format.json())
  });

  // transport.on('rotate', function(_oldFilename: any, _newFilename: any) {
  //   // do something fun
  // });

  var dailyLogger = winston.createLogger({
    transports: [
      transport
    ]
  });


// logging function
const postLogger = createLogger({
    transports: [
        new transports.File({
            filename: 'src/loggers/post-error.log',
            level: 'warn',
            format: format.combine(format.timestamp(), format.json())
        })
    ]
})

const userLogger = createLogger({
    transports: [
        new transports.File({
            filename: 'src/loggers/user-error.log',
            level: 'error',
            format: format.combine(format.timestamp(), format.json())
        })
    ]
})

module.exports = { postLogger, userLogger, dailyLogger }