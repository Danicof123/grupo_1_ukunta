// Si el usuario esta logueado, redirijo al store (no puede entrar ni en el login ni en el register)

const guestMiddleware = (req, res, next) => {
    if(req.session.userLogged) {
        return res.redirect('/store');
    }
    next()
};

module.exports = guestMiddleware;