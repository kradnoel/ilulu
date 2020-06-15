// Required dependencies
const express = require('express');
const routes = express.Router();

const visitante = require('./visitante');

routes.use("/visitantes", visitante);

module.exports = routes;
