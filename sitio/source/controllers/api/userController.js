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

module.exports = {
    findAllUsers,
    findById,
    findByRol,
};
