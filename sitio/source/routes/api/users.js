const { Router } = require('express');
const router = Router();

const {findAllUsers, findById, findByRol, setAvatarByuserId} = require('../../controllers/api/userController.js');
const uploadFile = require('../../middlewares/uploadAvatar.js');

// /api/users/
router.get('/', findAllUsers)
router.get('/:id', findById)
router.get('/category/:rol', findByRol)

// Actualizar imagen de perfil
router.post('/update/avatar', uploadFile.single('avatar') , setAvatarByuserId)

module.exports = router;