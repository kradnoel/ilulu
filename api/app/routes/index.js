// Required dependencies
const express = require('express');
const routes = express.Router();

const visitor = require('./visitor');
const equipament = require('./equipament');
const account = require('./account');

routes.use("/visitors", visitor);
routes.use("/equipaments", equipament);
routes.use("/accounts", account);

module.exports = routes;
