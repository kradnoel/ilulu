// Required dependencies
const express = require('express');
const routes = express.Router();

const visitor = require('./visitor');
const equipament = require('./equipament');
const account = require('./account');
const resident = require('./resident');

routes.use("/visitors", visitor);
routes.use("/equipaments", equipament);
routes.use("/accounts", account);
routes.use("/residents", resident);

module.exports = routes;
