const {validationResult} = require('express-validator');
//DB
const db = require('../database/models'),
    Op = db.Sequelize.Op;

// Controlador de la Tienda

/* VISTA TIENDA */
const store = async (req, res) => {
    const locals = {
        title: 'Tienda Ukunta'
    };
    res.render('store', locals);
};
/* VISTA DETALLE PRODUCTO */
const detail = async (req, res) => {
    try {
        // Obtengo el producto según el id
        let producto = await db.Product.findByPk(req.params.id, {include: [{association: 'category'}, {association: 'image'}]});

        // Si producto es un objeto vacio, que redirija a la tienda
        if (!producto) throw new Error('No existe el producto en nuestra base de datos');

        // Declaración de variables locales
        const locals = {
            title: `Detalle ${producto.name}`,
            producto,
            productos_db: await db.Product.findAll({include: [{association: 'category'}, {association: 'image'}]}),
            // Cuando se carguen mas productos modificar aquí
            prRelations: await db.Product.findAll({
                where: {
                    id: {
                        [Op.ne]: req.params.id, //Que el id sea diferente del mismo producto
                    },
                },
                include: [{association: 'category', where: {id: producto.categoryId}}, {association: 'image'}],
            }),
        };
        // Renderizado de la vista
        res.render('products', locals);
    } catch (err) {
        // Si hay algún que otro error que redirija a la tienda
        res.redirect('/store');
    }
};
/* VISTA DE CARGA DE PRODUCTO */
const addProduct = async (req, res) => {
    try {
        const locals = {
            categories: await db.Category.findAll(),
            title: 'Agregar producto',
        };
        return res.render('addProduct', locals);
    } catch (error) {
        // Si hay algún que otro error que redirija a la tienda
        res.redirect('/store');
    }
};
/* CREACIÓN DE PRODUCTO */
const createProduct = (req, res) => {
    let errors = validationResult(req);
    //Si no hay errores
    if (errors.isEmpty()) {
        const {name, description, category} = req.body;
        //Creo el producto con lo que viene del body
        db.Product.create({
            ...req.body,
            name: name.trim(),
            description: description.trim(),
            categoryId: category,
        }).then((newProduct) => {
            //Creo una variable vacia para pushearle las imagenes
            let imagesProduct = [];
            let imagesToAdd = req.files.map((image) => image.filename);
            imagesToAdd.forEach((img) => {
                let image = {
                    productId: newProduct.id,
                    name: img,
                };
                imagesProduct.push(image);
            });
            //Guardo en base de datos las imagenes asociadas al producto y redirigo a la vista del producto creado
            db.Image.bulkCreate(imagesProduct, {validate: true});
            res.redirect(`/store/products/${newProduct.id}`);
        });
    } else {
        db.Category.findAll()
            .then((categories) => {
                return res.render('addProduct', {
                    title: 'Agregar producto',
                    categories,
                    errors: errors.mapped(),
                    old: req.body,
                });
            })
            .catch((error) => console.log(error));
    }
};
/* VISTA EDICIÓN DE PRODUCTO */
const editProducto = (req, res) => {
    let categories = db.Category.findAll();
    let product = db.Product.findByPk(req.params.id, {
        include: [{association: 'category'}],
    });
    Promise.all([categories, product]).then(([categories, product]) => {
        return res.render('editProduct', {
            title: `Editando ${product.name}`,
            categories,
            product,
        });
    });
};
/* ACTUALIZAR PRODUCTO */
const updateProducto = (req, res) => {
    const resultValidation = validationResult(req);
    let categories = db.Category.findAll();
    let product = db.Product.findByPk(req.params.id, {
        include: [{association: 'category'}],
    });

    // Si hay errores en el formulario de la edicion paso los errores
    if (resultValidation.errors.length > 0) {
        Promise.all([categories, product])
            .then(([categories, product]) => {
                return res.render('editProduct', {
                    title: 'Editando',
                    product,
                    categories,
                    errors: resultValidation.mapped(),
                    old: req.body,
                });
            })
            .catch((error) => console.log(error));
        // Si no hay errores en el formulario de la edicion
    } else {
        const {name, description, category} = req.body;
        //Actualizo el producto con lo que viene del body al ID que venga por parametro
        db.Product.update(
            {
                ...req.body,
                name: name.trim(),
                description: description.trim(),
                categoryId: category,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        )
            //Redirigo a la vista del producto
            .then(() => res.redirect(`/store/products/${req.params.id}`))
            .catch((error) => console.log(error));
    }
};
/* ELIMINAR PRODUCTO */
const remove = (req, res) => {
    db.Product.destroy({
        where: {
            id: req.params.id,
        },
    })
        .then((result) => {
            // Redirecciona por donde viene
            return res.send(result);
            res.redirect(req.headers.referer);
        })
        .catch((error) => {
            // Si hay algún que otro error que redirija a la tienda
            console.log(error);
            res.redirect('/store');
        });
};

module.exports = {
    store,
    detail,
    addProduct,
    createProduct,
    editProducto,
    updateProducto,
    remove,
};
