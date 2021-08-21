const express = require('express'),
   router = express.Router(),
   // Controllers
   {cart} = require('../controllers/cartController');
   // Middlewares
   authMiddleware = require('../middlewares/authMiddleware'); // Si no esta logueado, no puede ingresar al carrito

/* /cart */
router.get('/', authMiddleware, cart);

module.exports = router;