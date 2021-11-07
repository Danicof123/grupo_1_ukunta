const { Router } = require('express');
const router = Router();

const {findAllProduct, findById, findByCategory, findByTag, deleteProduct, updateProduct, updateImage, createProduct, getAllCategories} = require('../../controllers/api/productController.js');
const uploadFile = require('../../middlewares/uploadProducts.js');
const { validationsCreate } = require('../../modules/validatorProducts.js');

// /api/products/
router.get('/', findAllProduct)
router.get('/search', findByTag)
router.get('/detail/:id', findById)
router.get('/categories', getAllCategories)
router.get('/:cat', findByCategory)

// Creando producto 
router.post('/create', uploadFile.array('images'), validationsCreate, createProduct)

// Actualizando
router.put('/update/:id', updateProduct)
router.put('/update/images/:id', updateImage)

// Eliminando
router.delete('/delete/:id', deleteProduct)


module.exports = router;
