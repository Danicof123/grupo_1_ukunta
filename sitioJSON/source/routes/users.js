const express = require('express');
const router = express.Router();
// Modules
const {usersValidator, validationLogin, validationProfile} = require('../modules/validator');
// Middlewares
const authMiddleware = require('../middlewares/authMiddleware'); // Si no esta logueado, no puede ingresar al perfil
const guestMiddleware = require('../middlewares/guestMiddleware'); // Si ya esta logueado, no puede ingresar a registro ni login
// Controllers
const {login, loginProcess, register, createUser, logout, profile, updateProfile} = require('../controllers/userController');
const avatarUpload = require('../modules/multerAvatar');


// Login
router.get('/login', guestMiddleware, login);
router.post('/login', validationLogin, loginProcess);
// Register
router.get('/register', guestMiddleware, register);
router.post('/register', usersValidator, createUser);
// Logout
router.get('/logout', logout);
// Profile
router.get('/profile', authMiddleware, profile);
router.put('/profile', usersValidator,avatarUpload.single('avatar'), updateProfile)

module.exports = router;
