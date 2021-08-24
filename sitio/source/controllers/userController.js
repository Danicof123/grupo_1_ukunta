const {users_db, guardarUser} = require('../data/users_db');
const {validationResult} = require('express-validator')

const userCreation = user => {
    users_db.push(user);
};

const saveUser = () => {
    guardarUser(users_db)
};



module.exports = {
    login: (req,res) => {
        res.render('login', {
            title : 'Iniciar sesión',
        })
    },

    register : (req,res) => {
        
      
        res.render('register', {
            title : 'Registrese',
            users_db
        })
    },
    
    createUser: (req,res) => {
        let {name, lastname, datebirth, DNI, phone, email, password, country, state, city, adress} = req.body;
        let errors = validationResult(req);

        let locals = {
                title : 'Registrese',
                errors : errors.mapped(),
                old : req.body,
                users_db
        };
        
        if(errors.isEmpty()){

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
            }

            userCreation(user);
            saveUser();
            res.redirect('/');

        } else {
            
            
            res.render('register', locals)
        }
        
        
    },

    profile : (req, res) => {
        const locals = {
            title: 'Profile'
        }
        res.render('profile', locals)
    }
    
}   