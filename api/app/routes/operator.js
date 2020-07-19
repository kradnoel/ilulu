// Required dependencies
const express = require('express');
const router = express.Router();

const { auth } = require('../middlewares')
const OperatorController = require('../controllers/OperatorController');

router.get('/', auth, OperatorController.index);
router.get('/:id', auth, OperatorController.getById);
//router.post('/register', auth, AccountController.register);
//router.post('/login', AccountController.login);
//router.put('/update', auth, AccountController.modify);
//router.delete('/delete', auth, AccountController.remove);

module.exports = router
