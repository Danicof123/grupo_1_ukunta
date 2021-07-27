const express = require('express');
const router = express.Router();

const {login, register} = require('../controllers/userController');

router.get('/login', login);
router.get('/register', register);


module.exports = router;