// Required dependencies
const express = require('express');
const router = express.Router();

const { auth } = require('../middlewares')
const AccountController = require('../controllers/AccountController');

router.get('/', auth, AccountController.index);
router.post('/register', AccountController.register);
router.post('/login', AccountController.login);

module.exports = router
