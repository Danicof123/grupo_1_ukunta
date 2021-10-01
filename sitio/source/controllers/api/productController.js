//DB
const db = require('../../database/models');
const {Op} = require('sequelize');

// API
const findAllProduct = async (req, res) => {
  res.json(await db.Product.findAll({
    include: ["category", "image"]
  }))
}

const findById = async (req, res) => {
  const producto = await db.Product.findByPk(req.params.id,{
    include: ["category", "image"]
  })
  if(producto) res.json(producto)
  else res.status(404).json({"error": 404, "msg": "El producto no existe"})
}

const findByCategory = async (req, res) => {
  res.json(await db.Product.findAll({
    include: [{"association" : "category", 
              where: {"name" : req.params.cat}},
            "image"]
  }))
}

const findByTag = async (req, res) => {
  const find = req.query.s; //Palabra clave a buscar
  // Traer la categoría q matchee (Luego uso el id)
  const cat = await db.Category.findOne({where: {"name" : find}})

  res.json(await db.Product.findAll({
    // Si coincide nombre, description o categoria
    where: {
      [Op.or]: [
          {name: { [Op.substring]: find }},
          {description: { [Op.substring]: find}},
          {categoryId: cat.id},
      ]
    } 
  }))
}

// Actualizando el producto
const updateProduct = async (req, res) => {
  try{
    const id = req.params.id;
    const producto = await db.Product.findByPk(id)
    // El producto que intento actualizar existe en la BD?
    if(producto){
      // Si no actualiza un dato dejo el que estaba
      await db.Product.update({
        name: req.body.name || producto.name,
        description: req.body.description || producto.description,
        size: req.body.size || producto.size,
        price: req.body.price || producto.price,
        stock: req.body.stock || producto.stock,
        expire: req.body.expire || producto.expire,
        categoryId: req.body.categoryId || producto.categoryId,
      },
      {where: {id : id}})

      res.json({"msg": "El producto fue actualizado con éxito"})

    }
    else
      res.status(404).json({"error": 404, "msg": "El producto que se intentó actualizar no existe"})
  }
  catch(err){
    res.status(500).json({"error": 500, "msg": "Sucedió un error al intentar actualizar el producto"})
  }
}



// Eliminando el producto
const deleteProduct = async (req, res) => {
  try{
    const id = req.params.id;
    // El producto que intento eliminar existe en la BD?
    if(await db.Product.findByPk(id)){
      // Elimino producto
      db.Product.destroy({where: {id: id}})
      // Elimino las imagenes asociadas al producto (de la BD)
      db.Image.destroy({where: {productId: id}})
      res.json({"msg": "El producto fue eliminado con éxisto"})
    }
    else
      res.status(404).json({"error": 404, "msg": "El producto que se intentó eliminar no existe"})
  }
  catch(err){
    res.status(500).json({"error": 500, "msg": "Sucedió un error al intentar eliminar el producto"})
  }
}

module.exports = {
  findAllProduct,
  findById,
  findByCategory,
  findByTag,
  updateProduct,
  deleteProduct
}