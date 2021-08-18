const path = require('path'),
   multer = require('multer'),
   storage = multer.diskStorage({
      destination: (req, file, cb) => {
         cb(null, './public/images/products/Bebidas/Cervezas');
      },
      filename: (req, file, cb) => {
         let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
         cb(null, fileName);
      },
   }),
   uploadFile = multer({storage});

module.exports = uploadFile;
