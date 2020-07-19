// Required dependencies
const express = require('express');
const routes = express.Router();

const visitor = require('./visitor');
const equipament = require('./equipament');
const account = require('./account');
const resident = require('./resident');
const operator = require('./operator');
const typeDocument = require('./typeDocument')

routes.use("/visitors", visitor);
routes.use("/equipaments", equipament);
routes.use("/accounts", account);
routes.use("/residents", resident);
routes.use("/operators", operator);
routes.use("/typeDocuments", typeDocument);

module.exports = routes;
