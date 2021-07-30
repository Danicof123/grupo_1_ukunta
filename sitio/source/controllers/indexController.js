const {productos_db} = require('../data/products_db');

const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
} 

const home = (req, res) => {
  res.render('home', {
    title : 'Ukunta',
})
}

const index = (req, res) => {
  res.redirect('home')
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
			producto: productos_db.filter(pr => (removeAccents(pr.name.toLowerCase()).includes(search) || removeAccents(pr.category.toLowerCase()).includes(search)) )
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