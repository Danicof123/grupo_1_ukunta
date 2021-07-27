const express = require('express'),
   router = express.Router(),
   // Controllers
   {cart} = require('../controllers/cartController');

/* /cart */
router.get('/', cart);

module.exports = router;