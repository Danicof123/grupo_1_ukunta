const productsDB = require('../models/ProductsDB');
const {validationResult} = require('express-validator')

const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
} 

const home = (req, res) => {
  const errors = validationResult(req);
  const locals = {
    title: 'Ukunta',
    errors : errors.mapped(),
    old: req.body,
  }
  res.render('home', locals)
}

const index = (req, res) => {
  res.render('welcome', {
    title: 'Ukunta'
  })
}

const about = (req, res) => {
  res.render('about', {
    title : 'Sobre Nosotros',
})
}

const welcome = (req,res) => {
  res.render('welcome', {
      title : 'Bienvenido a Ukunta',
  })
}

const search = (req,res) => {
  const search = removeAccents(req.query.s.toLowerCase());
		const locals = {
      title: "Resultado de búsqueda",
			producto: productsDB.search(search)
		}
		res.render('results', locals)
}

module.exports = {
  home,
  about,
  welcome,
  index,
  search,
}