const express = require('express'),
   router = express.Router(),
   // Controllers
   {store, detail, addProduct, editProducto} = require('../controllers/productController');

/* /store */
router.get('/', store);
router.get('/products/:id', detail);
router.get('/add', addProduct);
router.get('/edit', editProducto);



module.exports = router;
