// Si el usuario esta logueado, redirijo al login o al profile

const guestMiddleware = (req, res, next) => {
    if(req.session.userLogged) {
        return res.redirect('/store');
    }
    next()
};

module.exports = guestMiddleware;