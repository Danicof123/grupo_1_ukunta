const express = require('express'),
   router = express.Router(),
   // Controllers
   {store, detail, addProduct, editProducto, updateProducto, remove, createProduct} = require('../controllers/productController');

/* /store */
router.get('/:cat?', store);
router.get('/products/add', addProduct);
router.get('/products/:id', detail);
router.post('/', createProduct)
router.get('/edit/:id', editProducto);
router.put('/', updateProducto);
router.delete('/delete/:id', remove);



module.exports = router;
