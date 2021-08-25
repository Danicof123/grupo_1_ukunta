const products_db = require('../models/ProductsDB');
// Renderizar vista del panel de  administración
const adminController = (req, res) => {
    const locals = {
        title:  'Administración',
        products: products_db.getDB
    }
    res.render('dashboard', locals)

}


// Exportación de todos los controladores
module.exports ={
    adminController,
}