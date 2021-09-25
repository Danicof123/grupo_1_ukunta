const db = require('../database/models');
const {Op} = require('sequelize');
const {validationResult} = require('express-validator');

const removeAccents = (str) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

const home = (req, res) => {
    const errors = validationResult(req);
    const locals = {
        title: 'Ukunta',
        errors: errors.mapped(),
        old: req.body,
    };
    res.render('home', locals);
};

const index = (req, res) => {
    res.render('welcome', {
        title: 'Ukunta',
    });
};

const about = (req, res) => {
    res.render('about', {
        title: 'Sobre Nosotros',
    });
};

const welcome = (req, res) => {
    res.render('welcome', {
        title: 'Bienvenido a Ukunta',
    });
};

const search = (req, res) => {
    db.Product.findAll({
        include: [
            {
                association: 'image',
            },
        ],
        where: {
            [Op.or]: [
                {
                    name: {
                        [Op.substring]: req.query.s,
                    },
                },
                {
                    description: {
                        [Op.substring]: req.query.s,
                    },
                },
            ],
        },
    })
        .then((producto) =>
            res.render('results', {
                title: 'Resultado de búsqueda',
                producto,
                busqueda: req.query.s,
            })
        )
        .catch((error) => console.log(error));
};

module.exports = {
    home,
    about,
    welcome,
    index,
    search,
};
