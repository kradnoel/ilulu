// Required dependencies
const express = require('express');
const router = express.Router();

const { auth } = require('../middlewares')
const ResidentController = require('../controllers/ResidentController');

router.get('/', auth, ResidentController.index);
router.post('/create', auth, ResidentController.store);
//router.post('/login', auth, AccountController.login);

module.exports = router
