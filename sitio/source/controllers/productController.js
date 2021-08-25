const {validationResult} = require('express-validator');
const productsDB = require('../models/ProductsDB');

// Controlador de la Tienda
const store = (req, res) => {
   let productos_db = productsDB.getDB;
   // Obtiene la categoria por params y muestra el resultado
   switch (req.params.cat) {
      case 'cerveza':
         productos_db = productsDB.getForCategory('cerveza')
         break;
      case 'hidromiel':
         productos_db = productsDB.getForCategory('hidromiel')
         break;
      case 'merchandising':
         productos_db = productsDB.getForCategory('merchandising')
         break;
      default:
         productos_db = productsDB.getDB;
         break;
   }
   const locals = {
      title: 'Tienda Ukunta',
      productos_db,
   };
   res.render('store', locals);
}

const detail = (req, res) => {
   const id = parseInt(req.params.id, 10);
   // Si el id del detalle no existe, redirecciona a la tienda
   if (!productsDB.comprobarId(id)) res.redirect('/store');

   // Guardo el producto
   let producto = productsDB.getFind('id', id)

   // Variables a enviar a la vista (products)
   const locals = {
      title: `Detalle ${producto.name}`,
      producto,
      productos_db: productsDB.getDB,
      prRelations: productsDB.getRelations(id, producto.category),
   }
   // Renderizado de la vista
   res.render('products', locals);
}

const addProduct = (req, res) => {
   const locals = {
      title: 'Agregar producto',
      productos_db: productsDB.getDB,
   }

   res.render('addProduct', locals);
}

const createProduct = (req, res) => {
   const id = parseInt(req.body.id, 10);
   const resultValidation = validationResult(req);

   if (resultValidation.errors.length > 0) {
      // Variables a la vista
      const locals = {
         errors: resultValidation.mapped(),
         old: req.body,
         title: 'Agregar producto',
         productos_db: productsDB.getDB,
      }

      return res.render('addProduct', locals);
   } else {
      // Creo un nuevo producto con lo que viene en el body
      const newProduct = {...req.body}
      // Agrego las imagenes
      newProduct.images = req.files.map((image) => image.filename)
      // Añado en la BD el nuevo PRoducto
      productsDB.add(newProduct)
      // Redirecciono al detalle
      res.redirect(`/store/products/${id}`);
   }
}
const editProducto = (req, res) => {
   const id = parseInt(req.params.id, 10); //Convierte el string a Integer
   // Si el id del producto a editar no existe en la BD, redirige a la tienda
   if (!productsDB.comprobarId(id)) res.redirect('/store');
   // Variables a la vista
   const locals = {
      title: `Editando ${productsDB.getFind('id', id).name}`,
      product: productsDB.getFind('id', id),
   };


   res.render('editProduct', locals);
}
// Actualizar un producto
const updateProducto = (req, res) => {
   const id = parseInt(req.body.id, 10);

   const resultValidation = validationResult(req);

   // Si hay errores en el formulario de la edicion
   if (resultValidation.errors.length > 0) {
      // Si existe el id
      if (productsDB.comprobarId(id)) {
         // Variables a la vista
         const locals = {
            errors: resultValidation.mapped(),
            old: req.body,
            title: 'Editando ',
            product: productsDB.getFind('id', id),
         }
         return res.render('editProduct', locals);
      }
      // Si no hay errores en el formulario de la edicion
   } else {
      // Comprueba el id si existe en la BD
      if (productsDB.comprobarId(id)) {
         const pr = req.body; //Guarda el producto editado en pr
         pr.id = id;
         productsDB.setElement = pr;
         res.redirect(`/store/products/${id}`);
      }
   }
}
const remove = (req, res) => {
   const id = parseInt(req.params.id, 10);
   if (productsDB.comprobarId(id)) productsDB.delete(id);
   // Redirecciona por donde viene
   res.redirect(req.headers.referer);
}

module.exports = {
   store,
   detail,
   addProduct,
   createProduct,
   editProducto,
   updateProducto,
   remove,
};
