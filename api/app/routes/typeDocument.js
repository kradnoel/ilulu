const express = require('express');
const router = express.Router();

const { auth } = require('../middlewares')
const TypeDocumentController = require('../controllers/TypeDocumentController');

router.get('/', auth, TypeDocumentController.index);
//router.post('/create', auth, ResidentController.store);
//router.post('/login', auth, AccountController.login);

module.exports = router
