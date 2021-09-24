const bcryptjs = require('bcryptjs');

// const {users_db, guardarUser} = require('../data/users_db');
//const userDB = require('../models/UserDB');
const db = require('../database/models')
const {validationResult} = require('express-validator');


// const userCreation = (user) => {
//    users_db.push(user);
// };

// const saveUser = () => {
//    guardarUser(users_db);
// };

module.exports = {
   login: (req, res) => {
      res.render('login', {
         title: 'Iniciar sesión',
      });
   },

   loginProcess: async (req, res) => {

      let userToLogin = await db.User.findOne({where:{email: req.body.email}}); // Busco al usuario a loguear
      //let checkPassword = await db.User.findOne({where:{password: bcryptjs.compareSync(req.body.password, userToLogin.password)}})
      
      // if (userToLogin && checkPassword) {
         // Si tengo usuario a loguear...

   const resultValidation = validationResult(req);

   if  (userToLogin && bcryptjs.compareSync(req.body.password, userToLogin.password)){
         req.session.userLogged = {
            id: userToLogin.id,
            name: userToLogin.name,
            lastname: userToLogin.lastname,
            phone: userToLogin.phone,
            email: userToLogin.email,
            adress: userToLogin.adress,
            rol: userToLogin.rol,
         } ;
         
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
         db
        // userDB
         //users_db,
      });
   },

   createUser: (req, res) => {
      let {name, lastname, datebirth, dni, phone, email, password, country, state, city, adress} = req.body;
      let errors = validationResult(req);

      let locals = {
         title: 'Registrese',
         errors: errors.mapped(),
         old: req.body,
         db
         //userDB
         //users_db,
      };
      console.log(errors);
      //console.log(user)

      if (errors.isEmpty()) {
         db.User.create({
            name: name.trim(),
            lastname : lastname.trim(),
            datebirth,
            dni,
            phone,
            email,
            password: bcryptjs.hashSync(password,10),
            country,
            state,
            city,
            adress,
            avatar: "default.png",
            rol : "guest"
         })
         .then(user => {
            req.session.userLogin = {
               id: user.id,
               name: user.name,
               rol: user.rol
            }
            res.redirect('/home')

         }).catch(error => res.send(error))

        
        // userDB.add(user)
         
         //userCreation(user);
         //userDB.__saveDB()
         //saveUser();
         //res.redirect('/');
      } else {
         res.render('register', locals);
      }
   },
   profile: async (req, res) => {
      const locals = {
         title: 'Profile',
         user: await db.User.findByPk(req.session.userLogged.id),
      };
      res.render('profile', locals);
      //res.send(user)
   },
   updateProfile: (req, res) => {
      console.log(req.session.userLogged);
      let setUser = req.body; //Guardo lo que viene en el body en setUser
      setUser.id = req.session.userLogged.id //Tomo el id de la session
      //Agrego el nombre de la imagen si existe
      setUser.avatar = (req.file && req.file.filename)
                       ? req.file.filename 
                       : db.User.findByPk(req.session.userLogged.id).avatar;
      // Si se cambia la contraseña, la encripto antes de enviar al modelo
      if(setUser.password)
         setUser.password = bcryptjs.hashSync(setUser.password, 10)

      // Elimino propiedades inecesarias
      //delete setUser.old_password
      //delete setUser["password-repeat"]

      //userDB.setElement = setUser; //Actualizo el usuario
      res.redirect('/users/profile')
   }
};
