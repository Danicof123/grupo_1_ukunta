const { Router } = require('express');
const router = Router();

const {findAllUsers, findById, findByRol, setAvatarByuserId, setProfile, setPassword, setAddress} = require('../../controllers/api/userController.js');
const uploadFile = require('../../middlewares/uploadAvatar.js');

// /api/users/
router.get('/', findAllUsers)
router.get('/:id', findById)
router.get('/category/:rol', findByRol)

// Actualizar imagen de perfil
router.post('/update/avatar', uploadFile.single('avatar') , setAvatarByuserId)
router.put('/update/profile', setProfile)
router.put('/update/password', setPassword)
router.put('/update/address', setAddress)


module.exports = router;