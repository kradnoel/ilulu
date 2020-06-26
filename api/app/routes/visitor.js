// Required dependencies
const express = require('express');
const router = express.Router();

const VisitorController = require('../controllers/VisitorController');

router.get('/', VisitorController.index);
router.get('/:id', VisitorController.get);

module.exports = router;
