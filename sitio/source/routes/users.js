const express = require('express');
const router = express.Router();
const { usersValidator } = require('../modules/validator')

const {login, register, createUser} = require('../controllers/userController');

router.get('/login', login);
router.get('/register', register);
router.post('/register', usersValidator , createUser)


module.exports = router;