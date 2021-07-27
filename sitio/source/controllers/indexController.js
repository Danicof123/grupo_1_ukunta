const home = (req, res) => {
  res.render('home', {
    title : 'Ukunta',
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

module.exports = {
  home,
  about,
  welcome
}