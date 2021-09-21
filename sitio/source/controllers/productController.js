const {validationResult} = require('express-validator');
//JSON
const productsDB = require('../models/ProductsDB');
//DB
const db = require('../database/models'),
    Op = db.Sequelize.Op;

// Controlador de la Tienda
const store = async (req, res) => {
    // Guarda todos los productos, si se envia req.params.cat filtará por categoría
    const productos_db = req.params.cat
        ? await db.Product.findAll({include: [{association: 'category', where: {name: req.params.cat}}, {association: 'image'}]})
        : await db.Product.findAll({include: [{association: 'category'}, {association: 'image'}]});

    const locals = {
        title: 'Tienda Ukunta',
        productos_db,
    };
    res.render('store', locals);
};

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
                include: [{association: 'category'}, {association: 'image'}],
            }),
        };
        // Renderizado de la vista
        res.render('products', locals);
    } catch (err) {
        // Si hay algún que otro error que redirija a la tienda
        res.redirect('/store');
    }
};

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

const createProduct = async (req, res) => {
    //const id = parseInt(req.body.id, 10);
    /*try {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            // Variables a la vista
            const locals = {
                errors: resultValidation.mapped(),
                old: req.body,
                title: 'Agregar producto',
                categories: await db.Category.findAll(),
                //productos_db: productsDB.getDB,
            };
            return res.render('addProduct', locals);
        } else {
            // Creo un nuevo producto con lo que viene en el body
            const newProduct = {
                ...req.body,
                //name: name.trim(),
                //description: description.trim(),
            };
            // Agrego las imagenes
            newProduct.images = req.files.map((image) => image.filename);
            // Añado en la BD el nuevo PRoducto
            await db.Product.Create(newProduct);
            // Redirecciono al detalle
            res.redirect(`/store/products/${id}`);
        }
    } catch (error) {
        // Si hay algún que otro error que redirija a la tienda
        res.redirect('/store');
    }*/
    let errors = validationResult(req);

    if (errors.isEmpty()) {
        const {name, description, category} = req.body;

        db.Product.create({
            ...req.body,
            name: name.trim(),
            description: description.trim(),
            categoryId: category,
        })
            .then((product) => {
                if (req.files) {
                    let images = [];
                    let imagenes = req.files.map((imagen) => imagen.filename);
                    imagenes.forEach((img) => {
                        var image = {
                            file: img,
                            productId: product.id,
                        };
                        images.push(image);
                    });
                    db.Image.bulkCreate(images, {validate: true}).then(() => console.log('imagenes agregadas'));
                }
                return res.send(product);
                res.redirect(`/store/products/${id}`);
            })
            .catch((error) => console.log(error));
    } else {
        db.Category.findAll()
            .then((categories) => {
                return res.render('productAdd', {
                    categories,
                    errores: errors.mapped(),
                    old: req.body,
                });
            })
            .catch((error) => console.log(error));
    }
};
const editProducto = (req, res) => {
    const id = parseInt(req.params.id, 10); //Convierte el string a Integer
    // Si el id del producto a editar no existe en la BD, redirige a la tienda
    if (!productsDB.comprobarId(id)) res.redirect('/store');
    // Variables a la vista
    const locals = {
        title: `Editando ${productsDB.getFind('id', id).name}`,
        product: productsDB.getFind('id', id),
    };

    res.render('editProduct', locals);
};
// Actualizar un producto
const updateProducto = (req, res) => {
    const id = parseInt(req.body.id, 10);

    const resultValidation = validationResult(req);

    // Si hay errores en el formulario de la edicion
    if (resultValidation.errors.length > 0) {
        // Si existe el id
        if (productsDB.comprobarId(id)) {
            // Variables a la vista
            const locals = {
                errors: resultValidation.mapped(),
                old: req.body,
                title: 'Editando ',
                product: productsDB.getFind('id', id),
            };
            return res.render('editProduct', locals);
        }
        // Si no hay errores en el formulario de la edicion
    } else {
        // Comprueba el id si existe en la BD
        if (productsDB.comprobarId(id)) {
            const pr = req.body; //Guarda el producto editado en pr
            pr.id = id;
            productsDB.setElement = pr;
            res.redirect(`/store/products/${id}`);
        }
    }
};
const remove = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (productsDB.comprobarId(id)) productsDB.delete(id);
    // Redirecciona por donde viene
    res.redirect(req.headers.referer);
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
