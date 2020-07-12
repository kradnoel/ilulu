// Required dependencies
const express = require('express');
const router = express.Router();

const { auth } = require('../middlewares')
const VisitorController = require('../controllers/VisitorController');

router.get('/', VisitorController.index);
router.get('/:id', VisitorController.get);
router.post('/create', VisitorController.store);

module.exports = router;
