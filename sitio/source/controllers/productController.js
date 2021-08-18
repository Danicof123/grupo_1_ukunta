const {validationResult} = require('express-validator');

let {productos_db, guardarProducto} = require('../data/products_db');

const comprobarId = (id) => id && !!productos_db.find((e) => e.id === id);

const reemplazarProd = (obj) => {
   productos_db.forEach((pr) => {
      if (pr.id === obj.id) {
         pr.name = obj.name;
         pr.category = obj.category;
         pr.description = obj.description;
         pr.price = obj.price;
         pr.images = obj.images || pr.images;
         return;
      }
   });
};

const eliminarProd = (id) => (productos_db = productos_db.filter((pr) => pr.id !== id));

const crearProd = (req) => {
   const obj = req.body;
   obj.id = productos_db[productos_db.length - 1].id + 1;
   if(req.files) {
      var allImages = req.files.map(image => image.filename)
   }
   obj.images = allImages;
   productos_db.push(obj);
};

const escribirBD = () => {
   guardarProducto(productos_db);
};

module.exports = {
   store: (req, res) => {
      let productos;
      switch (req.params.cat) {
         case 'cerveza':
            productos = productos_db.filter((pr) => pr.category === 'cerveza');
            break;
         case 'hidromiel':
            productos = productos_db.filter((pr) => pr.category === 'hidromiel');
            break;
         case 'merchandising':
            productos = productos_db.filter((pr) => pr.category === 'merchandising');
            break;
         default:
            productos = productos_db;
            break;
      }
      const locals = {
         title: 'Tienda Ukunta',
         productos_db: productos,
      };
      res.render('store', locals);
   },

   detail: (req, res) => {
      const id = parseInt(req.params.id, 10);

      if (!comprobarId(id)) res.redirect('/store');

      let producto = productos_db.find((producto) => producto.id === id);
      let prRelations = productos_db.filter(pr => pr.category === producto.category && pr.id !== producto.id);

      res.render('products', {
         title: 'Detalle Producto',
         producto,
         productos_db,
         prRelations,
      });
   },
   addProduct: (req, res) => {
      res.render('addProduct', {
         title: 'Agregar producto',
         productos_db,
      });
   },
   createProduct: (req, res) => {
      const resultValidation = validationResult(req);

      if (resultValidation.errors.length > 0) {
         return res.render('addProduct', {
            errors: resultValidation.mapped(),
            old: req.body,
            title: 'Agregar producto',
            productos_db,
         });
      } else {
         crearProd(req);
         escribirBD();
         res.redirect(`/store/products/${req.body.id}`);
      }
   },

   editProducto: (req, res) => {
      const id = parseInt(req.params.id, 10);

      if (!comprobarId(id)) res.redirect('/store');
      const locals = {
         title: 'Editando ',
         product: productos_db.find((pr) => pr.id === +req.params.id),
      };
      res.render('editProduct', locals);
   },

   updateProducto: (req, res) => {
      const id = parseInt(req.body.id, 10);

      const resultValidation = validationResult(req);

      if (resultValidation.errors.length > 0) {
         if (comprobarId(id)) {
            return res.render('editProduct', {
               errors: resultValidation.mapped(),
               old: req.body,
               title: 'Editando ',
               product: productos_db.find((pr) => pr.id === +req.params.id),
            });
         }
      } else {
         if (comprobarId(id)) {
            const pr = req.body; //Guarda el producto editado en pr
            pr.id = id;
            reemplazarProd(pr);
            escribirBD();
            res.redirect(`/store/products/${req.params.id}`);
         }
      }
   },

   remove: (req, res) => {
      const id = parseInt(req.params.id, 10);
      if (comprobarId(id)) {
         eliminarProd(id);
         escribirBD();
      }
      res.redirect('/store');
   },
};
