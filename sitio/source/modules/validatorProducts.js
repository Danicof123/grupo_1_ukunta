const path = require('path');
const {body} = require('express-validator');

const validationsCreate = [
   body('name').notEmpty().withMessage('Debes ingresar el nombre del producto.'),
   body('category').notEmpty().withMessage('Debes elegir la categoría.'),
   body('description').notEmpty().withMessage('Debes ingresar la descripción del producto.'),
   body('price').notEmpty().withMessage('Debes ingresar el precio del producto.'),
   body('stock').notEmpty().withMessage('Debes ingresar el stock del producto.'),
   body('expire').isISO8601('expire').withMessage('Formato de fecha inválido'),
   body('images').custom((value, {req}) => {
      let files = req.files;
      let aceptedExtensions = ['.jpg', '.jpeg', '.png'];

      if (!files.length > 0) {
         throw new Error('Debes seleccionar al menos una imagen para tu producto');
      } else {
         files.forEach((file) => {
            let fileExtension = path.extname(file.originalname);
            if (!aceptedExtensions.includes(fileExtension)) {
               throw new Error(`La imagen debe ser de tipo: ${aceptedExtensions.join(', ')}.`);
            }
         });
         return true;
      }
   }),
];

const validationsEdit = [
   body('name').notEmpty().withMessage('Debes ingresar el nombre o modificar el actual.'),
   body('description').notEmpty().withMessage('Debes ingresar una descripción o dejar la actual.'),
   body('price').notEmpty().withMessage('Debes ingresar el nuevo precio o dejar el actual.'),
   body('stock').notEmpty().withMessage('Debes ingresar el stock del producto o dejar el actual'),
   body('expire').isISO8601('expire').withMessage('Formato de fecha inválido'),
];

module.exports = {
   validationsCreate,
   validationsEdit,
};
