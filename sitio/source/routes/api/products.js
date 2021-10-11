const { Router } = require('express');
const router = Router();

const {findAllProduct, findById, findByCategory, findByTag, deleteProduct, updateProduct, updateImage, createProduct} = require('../../controllers/api/productController.js');

// /api/products/
router.get('/', findAllProduct)
router.get('/search', findByTag)
router.get('/detail/:id', findById)
router.get('/:cat', findByCategory)

// Creando producto
router.post('/create', createProduct)

// Actualizando
router.put('/update/:id', updateProduct)
router.put('/update/images/:id', updateImage)

// Eliminando
router.delete('/delete/:id', deleteProduct)


module.exports = router;