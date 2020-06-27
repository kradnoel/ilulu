// Required dependencies
const express = require('express');
const router = express.Router();

const EquipamentController = require('../controllers/EquipamentController');

router.get('/',EquipamentController.index);
router.post('/create', EquipamentController.store)
router.put('/update', EquipamentController.modify)


module.exports = router;
