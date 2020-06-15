'use strict'

// Required dependencies
//const config = require('./app/config/config')
const http = require('http')

// Create Express App
var app = require('./server')

// Create an HTTP server and listen on the configured port
var server = http.createServer(app)
server.listen(3001, () => console.log(`App started on *:${3001}`))
