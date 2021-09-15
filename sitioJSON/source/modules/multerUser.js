const path = require('path'),
   multer = require('multer')

const storage = multer.diskStorage({
      destination: (req, file, cb) => {
         cb(null, './public/images/products/Bebidas/Cervezas');
      },
      filename: (req, file, cb) => {
         let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
         cb(null, fileName);
      },
   })

const uploadFile = multer({storage}),
   fileFilter = (req, file, callback) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
         req.fileValidationError = 'Only Images';
         return callback(null, false, req.fileValidationError);
      }
      callback(null, true);
   };

module.exports = uploadFile;
