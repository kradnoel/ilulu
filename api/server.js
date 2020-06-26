// Require dependencies

const compression = require('compression');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const express = require('express');
const routes = require('./app/routes');
const cors = require('cors');

// Create an Express application
const app = express();

// Load middlewares
//app.use(logger(config.LOGGER))
app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(helmet());
app.use(routes);

//Production
//const db = require("./app/models");
//db.sequelize.sync();


//Development
const db = require("./app/models");
//db.sequelize.sync({ force: true }).then(() => {
//  console.log("Drop and re-sync db.");
//});
db.sequelize.sync().then(() => {
	console.log("Snc db.");
});


module.exports = app
