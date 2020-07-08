// Require dependencies
const dotenv = require('dotenv').config({path: '.env'})

const config = {}
const database = {}
const jwt = {}

//config.ENV = require('./config.json')[process.env.NODE_ENV || 'development']
config.ENV = process.env.NODE_ENV || 'development'
config.PORT = process.env.PORT || 3001

database.HOSTNAME = process.env.DATABASE_HOSTNAME
database.NAME = process.env.DATABASE_NAME
database.USERNAME = process.env.DATABASE_USERNAME
database.PASSWORD = process.env.DATABASE_PASSWORD
database.DIALECT = process.env.DATABASE_DIALECT

jwt.ALGORITHM = process.env.JWT_ALGORITHM || "HS256"
jwt.SECRET = process.env.JWT_SECRET || "token"

config.DATABASE = database
config.JWT = jwt

const requiredConfig = [
    config.DATABASE.HOSTNAME,
    config.DATABASE.NAME,
    config.DATABASE.USERNAME,
    config.DATABASE.DIALECT,
    //config.JWT.ALGORITHM,
    config.JWT.SECRET
]

var isConfigured = requiredConfig.every(function(value) {
    return value || false
})

if (!isConfigured) {
    const errorMessage = 'DATABASE_HOSTNAME, DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_DIALECT, JWT_ALGORITHM and JWT_SECRET must be set.'
    throw new Error(errorMessage)
}


module.exports = config
