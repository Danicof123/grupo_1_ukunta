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


module.exports = {
  home,
  about,
}