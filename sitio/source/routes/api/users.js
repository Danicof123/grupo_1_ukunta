const { Router } = require('express');
const router = Router();

const {findAllUsers, findById, findByRol, setAvatarByuserId, setUserbyId} = require('../../controllers/api/userController.js');
const uploadFile = require('../../middlewares/uploadAvatar.js');

// /api/users/
router.get('/', findAllUsers)
router.get('/:id', findById)
router.get('/category/:rol', findByRol)

// Actualizar imagen de perfil
router.post('/update/avatar', uploadFile.single('avatar') , setAvatarByuserId)
router.post('/update/profile', setUserbyId)


module.exports = router;