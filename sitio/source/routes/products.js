const express = require('express'),
   router = express.Router(),
   // Controllers
   {store, detail, addProduct, editProducto, updateProducto} = require('../controllers/productController');

/* /store */
router.get('/', store);
router.get('/products/:id', detail);
router.get('/add', addProduct);
router.get('/edit/:id', editProducto);
router.put('/', updateProducto);



module.exports = router;
