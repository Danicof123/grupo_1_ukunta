const express = require('express'),
   router = express.Router(),
   path = require('path'),
   multer = require('multer'),
   {body} = require('express-validator'),
   validations = [
      body('name').notEmpty().withMessage('Debes ingresar el nombre del producto.'),
      body('category').notEmpty().withMessage('Debes elegir la categoría.'),
      body('description').notEmpty().withMessage('Debes ingresar la descripción del producto.'),
      body('price').notEmpty().withMessage('Debes ingresar el precio del producto.'),
      body('images').custom((value, {req}) => {
         let file = req.file;
         let aceptedExtensions = ['.jpg', '.jpeg', '.png'];

         if (!file) {
            throw new Error('Debes seleccionar al menos una imagen para tu producto');
         } else {
            let fileExtension = path.extname(file.originalname);
            if (!aceptedExtensions.includes(fileExtension)) {
               throw new Error(`La imagen debe ser de tipo: ${aceptedExtensions.join(', ')}.`);
            }
         }
         return true;
      }),
   ],
   validationsEdit = [
      body('name').notEmpty().withMessage('Debes ingresar el nombreo modificar el actual.'),
      body('description').notEmpty().withMessage('Debes ingresar una descripción o dejar la actual.'),
      body('price').notEmpty().withMessage('Debes ingresar el nuevo precio o dejar el actual.'),
   ],
   storage = multer.diskStorage({
      destination: (req, file, cb) => {
         cb(null, './public/images/products/addProducts');
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
router.post('/', uploadFile.single('images'), validations, createProduct);
router.get('/products/:id', detail);
router.get('/products/edit/:id', editProducto);
router.put('/products/edit/:id', validationsEdit, updateProducto);
router.delete('/delete/:id', remove);

module.exports = router;
