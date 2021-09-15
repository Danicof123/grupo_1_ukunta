const { check } = require('express-validator');
const bcryptjs = require('bcryptjs');
const userDB = require('../models/UserDB');

const regName = /^[A-Za-zñÑáÁéÉiÍóÓúüÚÜ]{2,20}(\s+[A-Za-zñÑáÁéÉiÍóÓúüÚÜ]{2,20}){0,2}$/;
const regEmail = /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/;
const regPhone = /^[0-9]{9,10}$/;

const indexValidator = [
    check('name').custom((value, req) => {
        const name = value.trim();
        if (!regName.test(name))
            throw new Error('Nombre no válido.')
        return true;
    }),
    check('email').custom((value, req) => {
        const email = value.trim();
        if (!regEmail.test(email))
            throw new Error('El correo electrónico introducido no es válido.')
        return true;
    }),
    check('comment').isLength({
        min: 10,
        max: 255
    }).withMessage('El comentario debe tener un mínimo de 10 y un máximo de 255 caracteres.')
]


const usersValidator = [ 
    check('name')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({
        min : 2,
        max : 30,
    }).withMessage('El nombre debe tener como minimo 2 caracteres')
    .isAlpha().withMessage('El nombre debe tener solo letras'),

    check('lastname')
    .notEmpty().withMessage('El apellido es obligatorio')
    .isLength({
        min : 2,
        max : 30,
    }).withMessage('El apellido debe tener como minimo 2 caracteres')
    .isAlpha().withMessage('El apellido debe tener solo letras'),

    check('datebirth')
    .isISO8601('datebirth').withMessage('Formato de fecha inválido'),

    check('DNI')
    .notEmpty().withMessage('Debe ingresar un DNI')
    .isLength({
        
        max : 8
    }).withMessage('Debe ingresar un DNI válido'),

    check('phone')
    .notEmpty().withMessage('Debe ingresar un numero de telefono')
    .isLength({
        min : 10,
        max : 10
    }).withMessage('Ingrese un telefono válido sin 0 adelnate'),

    check('email')
    .isEmail().withMessage('Debe ingresar un email válido'),

    check('password')
    .isLength({
        min : 6,
        max : 8,
    }).withMessage('La contraseña debe tener un mínimo de 6 caracteres y un máximo e 8'),

    check('password2')
    .custom((value, {req}) => {
        if(value !== req.body.password){
            return false
        }
        return true;
    }).withMessage('Las contraseñas no coinciden'),

    check('country')
    .notEmpty().withMessage('Debe ingresar un país')
    .isLength({
        min : 2,
        max : 56,
    }).withMessage('Debe ingresar un nombre válido'),

    check('city')
    .notEmpty().withMessage('Debe ingresar una ciudad')
    .isAlpha().withMessage('La ciudad no debe contener números')
    .isLength({
        min : 2,
        max : 58,
    }).withMessage('Debe ingresar un nombre válido'),

    check('state')
    .notEmpty().withMessage('Debe ingresar un Estado')
    .isLength({
        min : 2,
        max : 58
    }).withMessage('Debe ingresar un nombre válido para el Estado'),

    check('adress')
    .notEmpty().withMessage('Debe ingresar una dirección')
    .isLength({
        min : 2,
        max : 58,
    }).withMessage('Debe ingresar una dirección válida'),

    check('terms')
    .notEmpty().withMessage('Debes aceptar los terminos y condiciones')
]

const validationLogin = [
    check('email')
    .isEmail().withMessage('Debe ingresar un email válido'),
    check('password')
    .isLength({
        min : 6,
        max : 8,
    }).withMessage('La contraseña debe tener un mínimo de 6 caracteres y un máximo e 8')
]

const validationProfile = [
    check('old_password').custom((val, req) => {
        const psw = val.trim();
        const user = userDB.getFind('id', req.session.userLogged.id)
        console.log(psw, user.password)
        if(!bcryptjs.compareSync(psw, user.id))
            throw new Error('La contraseña no es válida.')
        return true;
    })
]
module.exports = {
    indexValidator,
    usersValidator,
    validationLogin,
    validationProfile
}