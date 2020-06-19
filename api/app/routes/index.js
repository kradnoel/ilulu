// Required dependencies
const express = require('express');
const routes = express.Router();

const visitor = require('./visitor');
const equipament = require('./equipament');

routes.use("/visitors", visitor);
routes.use("/Equipaments", equipament);

module.exports = routes;
