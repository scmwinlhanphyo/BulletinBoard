import { createLogger, transports, format } from "winston";
// logging function
const postLogger = createLogger({
    transports: [
        new transports.File({
            filename: 'src/loggers/post-error.log',
            level: 'error',
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

module.exports = { postLogger, userLogger }