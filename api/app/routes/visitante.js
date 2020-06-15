// Required dependencies
const express = require('express');
const router = express.Router();

const VisitanteController = require('../controllers/VisitanteController');

router.get('/', VisitanteController.all);

module.exports = router;
