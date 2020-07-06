// Require dependencies

const compression = require('compression');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const express = require('express');
const routes = require('./app/routes');
const cors = require('cors');
const db = require("./app/models");
const { Logger, MorganLogThroughWinston } = require("./app/logger.js");

// Create an Express application
const app = express();

// Load middlewares
app.use(MorganLogThroughWinston)
app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(helmet());
app.use(routes);


//To Controll creation of database => Comment for production
db.sequelize.sync().then(() => {
	console.log("Snc db.");
});


module.exports = app
