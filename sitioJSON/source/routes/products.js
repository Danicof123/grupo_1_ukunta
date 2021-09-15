const express = require('express'),
   router = express.Router(),
   uploadFile = require('../modules/multerProducts'), // Carga de imagenes
   {validationsCreate, validationsEdit} = require('../modules/validatorProducts'), // Validaciones de productos
   {store, detail, addProduct, editProducto, updateProducto, remove, createProduct} = require('../controllers/productController'); // Controladores
   adminUserCheck = require('../middlewares/adminUserCheck');

/* /store */
router.get('/:cat?', store);
router.get('/products/add', adminUserCheck, addProduct);
router.post('/', uploadFile.array('images'), validationsCreate, createProduct);
router.get('/products/:id', detail);
router.get('/products/edit/:id', adminUserCheck, editProducto);
router.put('/products/edit/:id', validationsEdit, updateProducto);
router.delete('/delete/:id', remove);

module.exports = router;
