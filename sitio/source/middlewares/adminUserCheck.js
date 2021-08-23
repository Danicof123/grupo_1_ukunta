// Middleware para acceder a rutas y funciones solo con los privilegios de admin

module.exports = (req,res,next) => {
    if(req.session.userLogged && req.session.userLogged.rol === "admin"){
        next()
    }else{
        res.redirect('/home')
    }
}