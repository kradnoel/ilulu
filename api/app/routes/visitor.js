// Required dependencies
const express = require('express');
const router = express.Router();

const VisitorController = require('../controllers/VisitorController');

router.get('/', VisitorController.all);
router.get('/:id', VisitorController.one);

module.exports = router;
