const express = require('express'),
   router = express.Router(),
   // Controllers
   {store, detail} = require('../controllers/productController');

/* /store */
router.get('/', store);
router.get('/products/:id', detail);



module.exports = router;
