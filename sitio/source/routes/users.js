const express = require('express');
const router = express.Router();
// Modules
const {usersValidator} = require('../modules/validator');
// Middlewares
const guestMiddleware = require('../middlewares/guestMiddleware'); // Si ya esta logueado, no puede ingresar a registro ni login
// Controllers
const {login, loginProcess, register, createUser, logout} = require('../controllers/userController');

// Login
router.get('/login', guestMiddleware, login);
router.post('/login', loginProcess);
// Register
router.get('/register', guestMiddleware, register);
router.post('/register', usersValidator, createUser);
// Logout
router.get('/logout', logout);

module.exports = router;
