// Para pasar informacion a las vistas sobre el usuario logueado (rol, nombre, imagen)
// Lo configuro en el app.js

module.exports = (req,res,next) => {
    if(req.session.userLogged){
        res.locals.userLogged = req.session.userLogged
    }
    next()
}