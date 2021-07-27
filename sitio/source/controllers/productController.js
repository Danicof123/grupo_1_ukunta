const productos_db = require('../data/products_db');

module.exports = {
   store: (req, res) => {
      res.render('store', {
         title: 'Tienda Ukunta',
         productos_db,
      });
   },

   detail: (req, res) => {
      let producto = productos_db.find((producto) => producto.id === +req.params.id);

      res.render('products', {
         title: 'Detalle Producto',
         producto,
         productos_db,
      });
   },
   addProduct : (req, res) => {
      res.render('addProduct', {
         title: 'Agregar producto',
         productos_db,
      });
   },
   editProducto: (req, res) => {
      res.render('editProduct', {
         title: 'Editar producto',
         productos_db,
      });
   },
};
