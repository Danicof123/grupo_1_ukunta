const {check} = require('express-validator');
const bcryptjs = require('bcryptjs');
const db = require('../database/models');

const regName = /^[A-Za-zñÑáÁéÉiÍóÓúüÚÜ]{2,20}(\s+[A-Za-zñÑáÁéÉiÍóÓúüÚÜ]{2,20}){0,2}$/,
    regDate = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/,
    regDNI = /^[1-9][0-9]{7}$/,
    regPhone = /^(\+\d{1,3})?\d{10}$/,
    regEmail =
        /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/,
    regPassword = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/,
    regStreet = /^.{3,100}$/,
    regStreetNumber = /^[0-9]{1,5}$/,
    regAddress = /^.{10,255}$/;

const indexValidator = [
    check('name').custom((value, req) => {
        const name = value.trim();
        if (!regName.test(name)) throw new Error('Nombre no válido.');
        return true;
    }),
    check('email').custom((value, req) => {
        const email = value.trim();
        if (!regEmail.test(email)) throw new Error('El correo electrónico introducido no es válido.');
        return true;
    }),
    check('comment')
        .isLength({
            min: 10,
            max: 255,
        })
        .withMessage('El comentario debe tener un mínimo de 10 y un máximo de 255 caracteres.'),
];

const usersValidator = [
    check('name').custom((value, req) => {
        const name = value.trim();
        if (!regName.test(name)) throw new Error('El nombre es obligatorio, debe tener al menos 2 caracteres y un máximo de 20');
        return true;
    }),

    check('lastname').custom((value, req) => {
        const lastname = value.trim();
        if (!regName.test(lastname)) throw new Error('El apellido es obligatorio, debe tener al menos 2 caracteres y un máximo de 20');
        return true;
    }),

    /* isISO8601('datebirth').withMessage('Formato de fecha inválido'), */
    check('datebirth').custom((value, req) => {
        const datebirth = value;
        if (!regDate.test(datebirth)) throw new Error('Formato de fecha invalido.');
        return true;
    }),

    check('dni').custom((value, req) => {
        const dni = value.trim();
        if (!regDNI.test(dni)) throw new Error('Ingrese un DNI válido.');
        return true;
    }),

    check('phone').custom((value, req) => {
        const phone = value.trim();
        if (!regPhone.test(phone)) throw new Error('Ingrese un teléfono válido.');
        return true;
    }),

    check('email')
        .isEmail()
        .withMessage('Debe ingresar un email válido')
        .custom((value, {req}) => {
            return db.User.findOne({
                where: {
                    email: value,
                },
            })
                .then((user) => {
                    if (user) {
                        return Promise.reject();
                    }
                })
                .catch(() => Promise.reject('Email en uso'));
        }),

    check('password').custom((value, req) => {
        const password = value.trim();
        if (!regPassword.test(password))
            throw new Error('La contraseña debe tener entre 8 y 16 caracteres, al menos un número, una minúscula y una mayúscula.');
        return true;
    }),

    check('password2').custom((value, {req}) => {
            if (value !== req.body.password) {
                return false;
            }
            return true;
        })
        .withMessage('Las contraseñas no coinciden'),

    check('country')
        .notEmpty()
        .withMessage('Debe ingresar un país')
        .isLength({
            min: 2,
            max: 56,
        })
        .withMessage('Debe ingresar un nombre válido'),

    check('state')
        .notEmpty()
        .withMessage('Debe ingresar un Estado')
        .isLength({
            min: 2,
            max: 58,
        })
        .withMessage('Debe ingresar un nombre válido para el Estado'),

    check('city')
        .notEmpty()
        .withMessage('Debe ingresar una ciudad')
        .isLength({
            min: 2,
            max: 58,
        })
        .withMessage('Debe ingresar un nombre válido'),

    check('street').custom((value, req) => {
        const street = value.trim();
        if (!regStreet.test(street)) throw new Error('Debe ingresar una calle valida.');
        return true;
    }),

    check('streetNumber').custom((value, req) => {
        const streetNumber = value.trim();
        if (!regStreetNumber.test(streetNumber)) throw new Error('Debe ingresar una altura valida (Solo números).');
        return true;
    }),

    check('description').custom((value, req) => {
        const description = value.trim();
        if (!regAddress.test(description)) throw new Error('La descripción debe tener un minimo de 10 carácteres y un máximo de 255.');
        return true;
    }),

    check('terms').notEmpty().withMessage('Debes aceptar los terminos y condiciones'),
];

const validationLogin = [
    check('email').isEmail().withMessage('Debe ingresar un email válido'),
    check('password').custom((value, req) => {
        const password = value.trim();
        if (!regPassword.test(password))
            throw new Error('La contraseña debe tener entre 8 y 16 caracteres, al menos un número, una minúscula y una mayúscula.');
        return true;
    }),
];

const validationProfile = [
    check('old_password').custom((val, req) => {
        const psw = val.trim();

        const user = db.User.findByPk(req.session.userLogged.id);

        console.log(psw, user.password);
        if (!bcryptjs.compareSync(psw, user.id)) throw new Error('La contraseña no es válida.');
        return true;
    }),
];
module.exports = {
    indexValidator,
    usersValidator,
    validationLogin,
    validationProfile,
};
