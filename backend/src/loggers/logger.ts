// For Normal Log 
// import { createLogger, transports, format } from "winston"; 

import { format } from "winston";
var winston = require('winston');
require('winston-daily-rotate-file');

// Normal Logger Generate Function
// const postLogger = createLogger({
//     transports: [
//         new transports.File({
//             filename: 'src/loggers/post-error.log',
//             level: 'warn',
//             format: format.combine(format.timestamp(), format.json(), format.prettyPrint())
//         })
//     ]
// })

// const userLogger = createLogger({
//     transports: [
//         new transports.File({
//             filename: 'src/loggers/user-error.log',
//             level: 'error',
//             format: format.combine(format.timestamp(), format.json(), format.prettyPrint())
//         })
//     ]
// })
// module.exports = { postLogger, userLogger }

var postErrLevel1 = new winston.transports.DailyRotateFile({
  datePattern: 'YYYY-MM-DD-HH-mm',
  filename: 'post-info-%DATE%.log',
  dirname: './src/dailylog/post-error-log',
  maxFiles: 2,
  json: true,
  format: format.combine(format.timestamp(), format.json(), format.prettyPrint())
});

var postErrLevel2 = new winston.transports.DailyRotateFile({
  level: 'error',
  datePattern: 'YYYY-MM-DD-HH-mm',
  filename: 'post-error-%DATE%.log',
  dirname: './src/dailylog/post-error-log',
  maxFiles: 2,
  json: true,
  format: format.combine(format.timestamp(), format.json(), format.prettyPrint())
});

var postInfoLogger = winston.createLogger({
  level: 'info',
  transports: [
    postErrLevel1
  ]
});
var postErrorLogger = winston.createLogger({
  transports: [
    postErrLevel2
  ]
});



var userErrLevel1 = new winston.transports.DailyRotateFile({
  datePattern: 'YYYY-MM-DD-HH-mm',
  filename: 'user-info-%DATE%.log',
  dirname: './src/dailylog/user-error-log',
  maxFiles: 2,
  json: true,
  format: format.combine(format.timestamp(), format.json(), format.prettyPrint())
});

var userErrLevel2 = new winston.transports.DailyRotateFile({
  level: 'error',
  datePattern: 'YYYY-MM-DD-HH-mm',
  filename: 'user-error-%DATE%.log',
  dirname: './src/dailylog/user-error-log',
  maxFiles: 2,
  json: true,
  format: format.combine(format.timestamp(), format.json(), format.prettyPrint())
});

var userInfoLogger = winston.createLogger({
  level: 'info',
  transports: [
    userErrLevel1
  ]
});
var userErrorLogger = winston.createLogger({
  transports: [
    userErrLevel2
  ]
});

module.exports = { postInfoLogger, postErrorLogger, userInfoLogger, userErrorLogger }