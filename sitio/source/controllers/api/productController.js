//DB
const db = require('../../database/models');

const findAllProduct = async (req, res) => {
  res.json(await db.Product.findAll({
    include: ["category", "image"]
  }))
}

const findById = async (req, res) => {
  res.json(await db.Product.findByPk(req.params.id,{
    include: ["category", "image"]
  }))
}

const findByCategory = async (req, res) => {
  res.json(await db.Product.findAll({
    include: [{"association" : "category", 
              where: {"name" : req.params.cat}},
            "image"]
  }))
}

// const findByTag = async (req, res) => {
//   await
// }



module.exports = {
  findAllProduct,
  findById,
  findByCategory,
}