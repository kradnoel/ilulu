// Required dependencies
const express = require('express');
const router = express.Router();

const { auth } = require('../middlewares')
const EquipamentController = require('../controllers/EquipamentController');


router.get('/', auth, EquipamentController.index);
router.post('/create', auth, EquipamentController.store)
router.put('/update', auth, EquipamentController.modify)


module.exports = router;
