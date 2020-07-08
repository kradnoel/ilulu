// Required dependencies
const express = require('express');
const routes = express.Router();

const visitor = require('./visitor');
const equipament = require('./equipament');
const account = require('./account');

routes.use("/visitors", visitor);
routes.use("/Equipaments", equipament);
routes.use("/Accounts", account);

module.exports = routes;
