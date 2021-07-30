let {
   productos_db,
   guardarProducto
} = require('../data/products_db');


const comprobarId = id => (id && !!productos_db.find(e => e.id === id));

const reemplazarProd = obj => {
   productos_db.forEach(pr => {
      if (pr.id === obj.id) {
         pr.name = obj.name
         pr.category = obj.category
         pr.description = obj.description
         pr.price = obj.price
         pr.image = obj.image || pr.image
         return;
      }
   });
}

const eliminarProd = id => productos_db = productos_db.filter(pr => pr.id !== id);
const crearProd = obj => {
   obj.id = productos_db[productos_db.length - 1].id + 1;
   obj.image = obj.image || "not.jpg"
   productos_db.push(obj);
}

const escribirBD = () => {
   guardarProducto(productos_db);
}

module.exports = {


   store: (req, res) => {
      let productos;
      switch (req.params.cat) {
         case "cerveza":
            productos = productos_db.filter(pr => pr.category === "cerveza");
            break;
         case "hidromiel":
            productos = productos_db.filter(pr => pr.category === "hidromiel");
            break;
         case "merchandising":
            productos = productos_db.filter(pr => pr.category === "merchandising");
            break;
         default:
            productos = productos_db;
            break;
      }
      const locals = {
         title: 'Tienda Ukunta',
         productos_db: productos,
      }
      res.render('store', locals);
   },

   detail: (req, res) => {
      const id = parseInt(req.params.id, 10);

      if (!comprobarId(id))
         res.redirect('/store');

      let producto = productos_db.find((producto) => producto.id === id);

      res.render('products', {
         title: 'Detalle Producto',
         producto,
         productos_db,
      });
   },
   addProduct: (req, res) => {

      res.render('addProduct', {
         title: 'Agregar producto',
         productos_db,
      });
   },
   createProduct: (req, res) => {
      crearProd(req.body);
      escribirBD();
      res.redirect('/store');
   },

   editProducto: (req, res) => {
      const id = parseInt(req.params.id, 10);

      if (!comprobarId(id))
         res.redirect('/store');
      const locals = {
         title: "Editando ",
         product: productos_db.find(pr => pr.id === +req.params.id)
      }
      res.render('editProduct', locals);
   },


   updateProducto: (req, res) => {
      const id = parseInt(req.body.id, 10);

      if (comprobarId(id)) {
         const pr = req.body; //Guarda el producto editado en pr
         pr.id = id;
         reemplazarProd(pr)
         escribirBD()
         res.redirect('/store');
      }
   },
   remove: (req, res) => {
      const id = parseInt(req.params.id, 10);
      if (comprobarId(id)){
         eliminarProd(id)
         escribirBD()
      }
      res.redirect('/store');
   }
};