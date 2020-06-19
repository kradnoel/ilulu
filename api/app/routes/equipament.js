// Required dependencies
const express = require('express');
const router = express.Router();

const EquipamentController = require('../controllers/EquipamentController');

router.get('/',EquipamentController.index);
router.post('/create', EquipamentController.store)


module.exports = router;
