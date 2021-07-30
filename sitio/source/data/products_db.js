const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname,'products.json');

module.exports = {
  productos_db : JSON.parse(fs.readFileSync(productsFilePath),'utf-8'),
  guardarProducto : (producto) => fs.writeFileSync(productsFilePath, JSON.stringify(producto, null, 2), 'utf-8')  
}


