const { check } = require('express-validator');

const regName = /^[A-Za-zñÑáÁéÉiÍóÓúüÚÜ]{2,20}(\s+[A-Za-zñÑáÁéÉiÍóÓúüÚÜ]{2,20}){0,2}$/;
const regEmail = /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/;

const indexValidator = [
    check('name').custom((value, req) => {
        const name = value.trim();
        if (!regName.test(name))
            throw new Error('Nombre no válido.')
        return true;
    }),
    check('email').custom((value, req) => {
        const name = value.trim();
        if (!regEmail.test(name))
            throw new Error('El correo electrónico introducido no es válido.')
        return true;
    }),
    check('comment').isLength({
        min: 10,
        max: 255
    }).withMessage('El comentario debe tener un mínimo de 10 y un máximo de 255 caracteres.')
]


module.exports = {
    indexValidator,
}