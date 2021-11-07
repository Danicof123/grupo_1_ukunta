const multer = require("multer"),
  path = require("path");

const acceptType = ["image/png", "image/jpeg"];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Controlar si se envió una imagen
    const folder = path.join(__dirname, "../../public/images/products/Bebidas/Cervezas");
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
    cb(null, fileName);
 }
});

fileFilter = (req, file, cb) => {
  if(acceptType.includes(file.mimetype))
    cb(null, true)
  else{
    req.error = "Formato de imagen inválido. Tipo permitido: .jpg o .png "
    cb(null, false);
  }
};

const limits = { fileSize: 5*1024*1024 }
const uploadFile = multer({ storage, limits, fileFilter });




module.exports = uploadFile;
