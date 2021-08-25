const bcryptjs = require('bcryptjs');

const {users_db, guardarUser} = require('../data/users_db');
const userDB = require('../models/UserDB');
const {validationResult} = require('express-validator');

const userCreation = (user) => {
   users_db.push(user);
};

const saveUser = () => {
   guardarUser(users_db);
};

module.exports = {
   login: (req, res) => {
      res.render('login', {
         title: 'Iniciar sesión',
      });
   },

   loginProcess: (req, res) => {
      let userToLogin = userDB.getDB.find((user) => user.email === req.body.email); // Busco al usuario a loguear
      //let checkPassword = bcryptjs.compareSync(req.body.password, userToLogin.password)
      if (userToLogin && userToLogin.password === req.body.password) {
         // Si tengo usuario a loguear...
         req.session.userLogged = {
            // Guardo los datos del usuario en session
            id: userToLogin.id,
            nombre: userToLogin.nombre,
            rol: userToLogin.rol,
         };
         if (req.body.keep) {
            // Si doy check a mantener sesion, creo la cookie
            res.cookie('keepSession', req.session.userLogged, {maxAge: 1000 * 60 * 60});
         }
         return res.redirect('/home');
      } else {
         return res.render('login', {
            title: 'Iniciar sesión',
            errors: {
               email: {
                  msg: 'Credenciales inválidas',
               },
            },
         });
      }
   },

   logout: (req, res) => {
      res.clearCookie('keepSession');
      req.session.destroy();
      return res.redirect('/home');
   },

   register: (req, res) => {
      res.render('register', {
         title: 'Registrese',
         users_db,
      });
   },

   createUser: (req, res) => {
      let {name, lastname, datebirth, DNI, phone, email, password, country, state, city, adress} = req.body;
      let errors = validationResult(req);

      let locals = {
         title: 'Registrese',
         errors: errors.mapped(),
         old: req.body,
         users_db,
      };

      if (errors.isEmpty()) {
         let user = {
            name,
            lastname,
            datebirth,
            DNI,
            phone,
            email,
            password,
            country,
            state,
            city,
            adress,
         };

         userCreation(user);
         saveUser();
         res.redirect('/');
      } else {
         res.render('register', locals);
      }
   },
   profile: (req, res) => {
      const locals = {
         title: 'Profile',
      };
      res.render('profile', locals);
   },
};
