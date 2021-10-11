const { Router } = require('express');
const router = Router();

const {findAllUsers, findById, findByRol} = require('../../controllers/api/userController.js');

// /api/users/
router.get('/', findAllUsers)
router.get('/detail/:id', findById)
router.get('/:rol', findByRol)

module.exports = router;