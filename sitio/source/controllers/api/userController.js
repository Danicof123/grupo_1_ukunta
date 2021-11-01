const fs = require('fs')
//DB
const db = require('../../database/models');

const findAllUsers = async (req, res) => {
    res.json(
        await db.User.findAll({
            include: ['address', 'payment', 'cart'],
        })
    );
};

const findById = async (req, res) => {
    res.json(
        await db.User.findByPk(req.params.id, {
            include: ['address', 'payment', 'cart'],
        })
    );
};

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

module.exports = {
    findAllUsers,
    findById,
    findByRol,
    setAvatarByuserId,
};
