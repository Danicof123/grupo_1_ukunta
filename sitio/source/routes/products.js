const express = require('express'),
   router = express.Router(),
   uploadFile = require('../modules/multerProducts'), // Carga de imagenes
   {validationsCreate, validationsEdit} = require('../modules/validatorProducts'), // Validaciones de productos
   {store, detail, addProduct, editProducto, updateProducto, remove, createProduct} = require('../controllers/productController'); // Controladores
   adminUserCheck = require('../middlewares/adminUserCheck');

/* /store */
router
   .get('/:cat?', store)
   .get('/products/add', /* adminUserCheck, */ addProduct)
   .post('/', uploadFile.array('images'), validationsCreate, createProduct)
   .get('/products/:id', detail)
   .get('/products/edit/:id', adminUserCheck, editProducto)
   .put('/products/edit/:id', validationsEdit, updateProducto)
   .delete('/delete/:id', remove);

module.exports = router;
