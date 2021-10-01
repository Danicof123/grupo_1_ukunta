const { Router } = require('express');
const router = Router();

const {findAllProduct, findById, findByCategory} = require('../../controllers/api/productController.js');

// /api/products/
router.get('/', findAllProduct)
router.get('/detail/:id', findById)
router.get('/:cat', findByCategory)

module.exports = router;