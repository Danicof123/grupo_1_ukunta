const express = require('express');
const router = express.Router();
// Importación controladores
const {adminController} = require('../controllers/adminController')

// Panel de administración
router.get('/dashboard', adminController);

// Exportación del objeto router
module.exports = router;