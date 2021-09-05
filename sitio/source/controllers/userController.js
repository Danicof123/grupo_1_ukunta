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
      let checkPassword = bcryptjs.compareSync(req.body.password, userToLogin.password)
      if (userToLogin && checkPassword) {
         // Si tengo usuario a loguear...
         req.session.userLogged = {
            id: userToLogin.id,
            name: userToLogin.name,
            lastname: userToLogin.lastname,
            phone: userToLogin.phone,
            email: userToLogin.email,
            adress: userToLogin.adress,
            rol: userToLogin.rol,
         };
         if (req.body.keep) {
            // Si doy check a mantener sesion, creo la cookie
            res.cookie('keepSession', req.session.userLogged, {maxAge: 1000 * 60 * 60});
         }
         return res.redirect('/users/profile');
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
            password: bcrypt.hashSync(contrasenia,8),
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
         user: req.session.userLogged,
      };
      res.render('profile', locals);
   },
};
