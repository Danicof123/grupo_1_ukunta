const express = require('express'),
   router = express.Router(),
   // Controllers
   {store, detail, addProduct, editProducto, updateProducto, remove, createProduct} = require('../controllers/productController');

/* /store */
router.get('/', store);
router.get('/products/:id', detail);
router.get('/add', addProduct);
router.post('/', createProduct)
router.get('/edit/:id', editProducto);
router.put('/', updateProducto);
router.delete('/delete/:id', remove);



module.exports = router;
