// Required dependencies
const express = require('express');
const router = express.Router();

const { auth } = require('../middlewares')
const AccountController = require('../controllers/AccountController');

router.get('/', auth, AccountController.index);
router.post('/register', auth, AccountController.register);
router.post('/login', AccountController.login);
router.put('/update', auth, AccountController.modify);
router.delete('/delete', auth, AccountController.remove);

module.exports = router
