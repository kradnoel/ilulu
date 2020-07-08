// Required dependencies
const { createLogger, format, transports, config } = require('winston');
const { combine, colorize, timestamp, label, printf } = format;
const moment  = require('moment');
const morgan = require('morgan')
const winston = require

const Logger = createLogger({
  level: 'silly',
  levels: config.npm.levels,
  format: combine(
    colorize(),
    timestamp(),
    label({ label: 'right meow!' }),
    printf((params) => `${new Date().toTimeString()} - ${params.level}: ${params.message}`)
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logfile.log' })
  ]
});

const MorganLogThroughWinston = morgan('tiny', {
 stream: {
   write: (msg) => Logger.http(`\x1b[35m[request]\x1b[0m ${msg}`),
 }
});


module.exports = {
  Logger,
  MorganLogThroughWinston
}
