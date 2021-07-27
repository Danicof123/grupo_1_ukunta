const home = (req, res) => {
  res.render('home')
}

const about = (req, res) => {
  res.render('about')
}


module.exports = {
  home,
  about,
}