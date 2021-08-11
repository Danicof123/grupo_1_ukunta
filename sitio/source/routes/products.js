const express = require('express'),
   router = express.Router(),
   path = require('path'),
   // Middlewares
   multer = require('multer'),
   { validationsCreate, validationsEdit } = require('../modules/validatorProducts')
   storage = multer.diskStorage({
      destination: (req, file, cb) => {
         cb(null, './public/images/products/Bebidas/Cervezas');
      },
      filename: (req, file, cb) => {
         let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
         cb(null, fileName);
      },
   }),
   uploadFile = multer({storage}),
   // Controllers
   {store, detail, addProduct, editProducto, updateProducto, remove, createProduct} = require('../controllers/productController');

/* /store */
router.get('/:cat?', store);
router.get('/products/add', addProduct);
router.post('/', uploadFile.single('images'), validationsCreate, createProduct);
router.get('/products/:id', detail);
router.get('/products/edit/:id', editProducto);
router.put('/products/edit/:id', validationsEdit, updateProducto);
router.delete('/delete/:id', remove);

module.exports = router;
