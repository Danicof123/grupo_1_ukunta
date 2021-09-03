const express = require('express');
const router = express.Router();
// Importación controladores
const {adminController} = require('../controllers/adminController'),
    authMiddleware = require('../middlewares/authMiddleware');

// Panel de administración
router.get('/dashboard', authMiddleware, adminController);

// Exportación del objeto router
module.exports = router;