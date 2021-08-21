const Connect = require("./connect");

const path = require('path'),
      dirProductsDB = path.join(__dirname, '..', 'data', 'products.json');

const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
} 

//   Creacion de clase que hereda de Connect
class ProductsDB extends Connect{
    constructor(dirDB){
        super(dirDB)
    }
    getForCategory(value) {
        return this.__database.filter(product => product.category === value);
    }
    getRelations(id, category){
        return this.__database.filter(pr => pr.category === category && pr.id !== id)
    }

    search(search){
        return this.__database.filter(pr => (removeAccents(pr.name.toLowerCase()).includes(search) || removeAccents(pr.category.toLowerCase()).includes(search))  )
    }

}

module.exports = new ProductsDB(dirProductsDB)