const bcryptjs = require('bcryptjs');

const {users_db, guardarUser} = require('../data/users_db');
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
      let userToLogin = users_db.find((user) => user.email === req.body.email); // Busco al usuario a loguear

      if (userToLogin) {
         //let checkPassword = bcryptjs.compareSync(req.body.password, userToLogin.password)
         if (userToLogin.password === req.body.password) { // Valido la contraseña del usuario a loguear
            delete userToLogin.password; // Elimino el password para no guardar informacion sensible en la cookie
            req.session.userLogged = userToLogin // Creo la propiedad UserLogged en session para almacenar los datos del usuario
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

   logout: (req,res) => {
      req.session.destroy();
      return res.redirect('/home')
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
};
