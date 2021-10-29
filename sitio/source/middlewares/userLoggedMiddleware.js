const db = require('../database/models');

const userLoggedMiddleware = async (req, res, next) => {
   let userFromCookie
   res.locals.isLogged = false; // Seteo en false el isLogged

   let keepSessionInCookie = req.cookies.keepSession; // Si tengo alguien en cookie, le mantengo al session

   if(keepSessionInCookie)
      userFromCookie = await db.User.findOne({where: {id: keepSessionInCookie.id}});// Traigo los datos del usuario en sesión


   if (userFromCookie) {
      // Si tengo usuario en cookie, paso los datos a session
      req.session.userLogged = userFromCookie;
   }

   if (req.session.userLogged) {
      // Si tengo a un usuario logueado en sesion
      res.locals.isLogged = true;
      res.locals.userLogged = req.session.isLogged;
   }

   next();
};

module.exports = userLoggedMiddleware;
