module.exports = {
    login: (req,res) => {
        return res.render('login')
    },
    register : (req,res) => {
        return res.render('register')
    },
    welcome : (req,res) => {
        return res.render('welcome')
    }
}