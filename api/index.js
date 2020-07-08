'use strict'

// Required dependencies
//const config = require('./app/config/config')
const http = require('http')
const { Logger } = require("./app/logger.js");

const config = require('./app/config')

// Create Express App
var app = require('./server')

// Create an HTTP server and listen on the configured port
var server = http.createServer(app)
server.listen(config.PORT, () => Logger.info(`App started on *:${config.PORT}`))
