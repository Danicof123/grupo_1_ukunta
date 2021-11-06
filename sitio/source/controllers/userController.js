const bcryptjs = require('bcryptjs');
const db = require('../database/models');
const {validationResult} = require('express-validator');

module.exports = {
    login: (req, res) => {
        res.render('login', {
            title: 'Iniciar sesión',
        });
    },

    loginProcess: async (req, res) => {
        //Busco al usuario a loguear
        let userToLogin = await db.User.findOne({where: {email: req.body.email}});
        //Si encuentro el usuario y coincide con la contraseña
        if (userToLogin && bcryptjs.compareSync(req.body.password, userToLogin.password)) {
            //Guardo los datos en session
            req.session.userLogged = {
                id: userToLogin.id,
                rol: userToLogin.rol,
            };
            // Si doy check a mantener sesion, creo la cookie
            if (req.body.keep) {
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
            db,
        });
    },

    createUser: (req, res) => {
        let {name, lastname, datebirth, dni, phone, email, password, street, streetNumber, description, country, state, city} = req.body;
        let errors = validationResult(req);

        let locals = {
            title: 'Registrese',
            errors: errors.mapped(),
            old: req.body,
        };
        if (errors.isEmpty()) {
            let newUser = {
                name: name.trim(),
                lastname: lastname.trim(),
                datebirth,
                dni,
                phone,
                email,
                password: bcryptjs.hashSync(password, 10),
                avatar: 'default.png',
                rol: 'guest',
            };
            db.User.create(newUser)
                .then((user) => {
                    db.Address.create({
                        street: null,
                        streetNumber: null,
                        description: null,
                        country: null,
                        state: null,
                        city: null,
                        userId: user.id,
                    });
                    res.redirect('/users/login');
                })
                .catch((error) => res.send(error));
        } else {
            res.render('register', locals);
        }
    },
    profile: async (req, res) => {
        const locals = {
            title: 'Profile',
            userId: req.session.userLogged.id,
        };
        res.render('profile', locals);
    },
    updateProfile: async (req, res) => {
        console.log(req.session.userLogged);
        let setUser = req.body; //Guardo lo que viene en el body en setUser
        setUser.id = req.session.userLogged.id; //Tomo el id de la session
        //Agrego el nombre de la imagen si existe
        setUser.avatar = req.file && req.file.filename ? req.file.filename : (await db.User.findByPk(req.session.userLogged.id)).avatar;
        // Si se cambia la contraseña, la encripto antes de enviar al modelo
        if (setUser.password) setUser.password = bcryptjs.hashSync(setUser.password, 10);
        db.User.update(setUser, {where: {id: setUser.id}})
        res.redirect('/users/profile');
    },
};