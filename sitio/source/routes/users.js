const express = require('express');
const router = express.Router();

const {login, register, welcome} = require('../controllers/userController');

router.get('/login', login);
router.get('/register', register);
router.get('/welcome', welcome);

module.exports = router;