module.exports = {
    login: (req,res) => {
        res.render('login', {
            title : 'Iniciar sesión',
        })
    },
    register : (req,res) => {
        res.render('register', {
            title : 'Registrese',
        })
    },
    welcome : (req,res) => {
        res.render('welcome', {
            title : 'Bienvenido a Ukunta',
        })
    }
}