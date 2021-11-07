const fs = require('fs')
const bcrypt = require('bcryptjs')
const {validationResult} = require('express-validator');
//DB
const db = require('../../database/models');

// Devuelve a todos los usuarios
const findAllUsers = async (req, res) => {
    res.json(
        await db.User.findAll({
            include: ['address', 'payment', 'cart'],
        })
    );
};

// Devuelve a un usuario según su id
const findById = async (req, res) => {
    res.json(
        await db.User.findByPk(req.params.id, {
            include: ['address', 'payment', 'cart'],
        })
    );
};

// Devuelve a todos los usuarios según su rol
const findByRol = async (req, res) => {
    res.json(
        await db.User.findAll({
            include: ['address', 'payment', 'cart'],
            where: {
                rol: req.params.rol
            }
        })
    );
};

// Actualiza la imagen de perfil del usuario
const setAvatarByuserId = (req, res) => {
    const file = req.file;
    try {
        if(req.error) throw req.error
        db.User.update({
            avatar: file.filename
        }, {where: {id: req.body.userId}})

        res.status(200).json({status: "success", message: "La imagen se subió correctamente", name: file.filename})
    } catch (err) {
        res.status(200).json({status: "error", message: err})
    }
}
// Actualizar datos de perfil/Contacto
const setProfile = async (req, res) => {
    const data = req.body,
          userId = data.userId;
    try{
        if(!data && !userId) throw {status: "error", message: "No se encontró al usuario"}
        // Si viene un correo, Comienzo una comprobación
        if(data.email){
            const correo = (await db.User.findByPk(userId)).email;
            if (correo !== data.email && await db.User.findOne({where: {email: data.email}}))
                throw {status: "error", message: "El correo ya existe, no se pudo actualizar.."}   
        }

        delete data.userId;
        db.User.update(data, {where: {id: userId}})

        res.json({status: "success", message: "Se actualizó con éxito"})
    }
    catch(err){
        res.json(err)
    }
}

// Actualizar Direccion
const setAddress = async (req, res) => {
    const data = req.body,
          userId = data.userId;
    try{
        if(!data && !userId) throw {status: "error", message: "No se encontró al usuario"}
        // Si viene un correo, Comienzo una comprobación
        delete data.userId;
        db.Address.update(data, {where: {userId: userId}})

        res.json({status: "success", message: "Se actualizó con éxito"})
    }
    catch(err){
        res.json(err)
    }
}

// Actualizar Contraseña
const setPassword = async (req, res) => {
    const data = req.body,
          userId = data.userId;
    try{
        if(!data && !userId) throw {status: "error", message: "No se encontró al usuario"}
        delete data.userId;
        // Consigo la contraseña actual del usuario para comparar
        const password = (await db.User.findByPk(userId)).password;
        if(!bcrypt.compareSync(data.oldPassword, password)) throw {status: "error", message: "La contraseña es incorrecta"}
        // Una vez se comprueban que la contraseña anterior coincide con la introducida por el usuario, la elimino
        delete data.oldPassword;
        // Actualizo la contraseña (Encriptandola)
        db.User.update({password: bcrypt.hashSync(data.password, 10)}, {where: {id: userId}})
        res.json({status: "success", message: "La contraseña se actualizó con éxito"})
    }
    catch(err){
        res.json(err)
    }
}

// Creación de un usuario
const createUser = async (req, res) => {
    const data = req.body;
    let errors = validationResult(req);
    try {
        // Compruebo que no hayan errores 
        if (!errors.isEmpty()) throw {status: "error", message: "Se produjo un error al intentar crear el usuario..", errors: errors}
        // Agrego algunos datos extras para la creación del usuario
        data.password = bcrypt.hashSync(data.password, 10);

        data.datebirth = data.date;
        data.avatar = 'default.png';
        data.rol = 'guest';

        // Elimino datos innecesarios
        delete data.terms;
        delete data.date;

        // Creación del usuario
        db.User.create(data)
            .catch(err =>{
                res.json({status: "error", message: "Se produjo un error al intentar crear el usuario.."})
            })
        res.json({status: "success", message: "La cuenta se creo con éxito"})
    } catch (err) {
        res.json({status: "error", message: err.message, errors: err.errors})
    }
}

module.exports = {
    findAllUsers,
    findById,
    findByRol,
    setAvatarByuserId,
    setProfile,
    setPassword,
    setAddress,
    createUser
};
