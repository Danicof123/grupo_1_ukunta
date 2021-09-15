const path = require('path'),
      multer = require('multer');

    // Guardo imagenes en images/users
    // Nombre: id+telefono
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', '..', 'public', 'images', 'users'))
    },
    filename: (req, file, cb) =>{
        const filename = `${Date.now()}-${req.session.userLogged.phone}${path.extname(file.originalname)}`
        cb(null, filename)
    }
})

// Guardo configuracion de almacenamiento de multer en avatarUpload
const avatarUpload = multer({storage});

// Exporto avatarUpload
module.exports = avatarUpload;