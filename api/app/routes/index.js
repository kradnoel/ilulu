// Required dependencies
const express = require('express');
const routes = express.Router();

const visitor = require('./visitor');

routes.use("/visitors", visitor);

module.exports = routes;
