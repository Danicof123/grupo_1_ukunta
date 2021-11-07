const path = require('path');
const {body} = require('express-validator');

const regName = /^[A-Za-zñÑáÁéÉiÍóÓúüÚÜ]{2,45}(\s+[A-Za-zñÑáÁéÉiÍóÓúüÚÜ]{2,20}){0,2}$/,
    regCategory = /^[1-3]$/,
    regDescription = /^.{10,255}$/,
    regSize = /^.{0,15}$/,
    regPrice = /^\d*(\.\d{1})?\d{0,1}$/,
    regStock = /^[0-9]{1,4}$/,
    regDate = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))?$/;

const validationsCreate = [
    body('name').custom((value, req) => {
        const name = value.trim();
        if (!regName.test(name)) throw new Error('Debe ingresar el nombre del producto.');
        return true;
    }),

    body('categoryId').custom((value, req) => {
        const category = value;
        if (!regCategory.test(category)) throw new Error('Debes seleccionar una categoría.');
        return true;
    }),

    body('description').custom((value, req) => {
        const description = value;
        if (!regDescription.test(description)) throw new Error('La descripción debe tener un mínimo de 10 caracteres y un máximo de 255.');
        return true;
    }),

    body('size').custom((value, req) => {
        const size = value;
        if (!regSize.test(size)) throw new Error('El tamaño o volumen del producto debe tener un máximo de 15 caracteres.');
        return true;
    }),

    body('price').custom((value, req) => {
        const price = value;
        if (!regPrice.test(price)) throw new Error('Debes ingresar el precio en formato número con un máximo de 2 decimales.');
        return true;
    }),

    body('stock').custom((value, req) => {
        const stock = value;
        if (!regStock.test(stock)) throw new Error('Debes ingresar el stock con un máximo de 9999 unidades.');
        return true;
    }),

    body('expire').custom((value, req) => {
        const expire = value;
        if (!regDate.test(expire)) throw new Error('Formato de fecha invalido.');
        return true;
    }),

    body('images').custom((value, {req}) => {
        let files = req.files;
        let aceptedExtensions = ['.jpg', '.jpeg', '.png'];

        if (!files.length > 0) {
            throw new Error('Debes seleccionar al menos una imagen para tu producto.');
        } else {
            files.forEach((file) => {
                let fileExtension = path.extname(file.originalname);
                if (!aceptedExtensions.includes(fileExtension)) {
                    throw new Error(`La imagen debe ser de tipo: ${aceptedExtensions.join(', ')}.`);
                }
            });
            return true;
        }
    }),
];

const validationsEdit = [
    body('name').custom((value, req) => {
        const name = value.trim();
        if (!regName.test(name)) throw new Error('Debes ingresar el nombre o modificar el actual.');
        return true;
    }),

    body('category').custom((value, req) => {
        const category = value;
        if (!regCategory.test(category)) throw new Error('Debes seleccionar una categoría o dejar la actual.');
        return true;
    }),

    body('description').custom((value, req) => {
        const description = value;
        if (!regDescription.test(description)) throw new Error('Debes ingresar una descripcion o modificar el actual.');
        return true;
    }),

    body('size').custom((value, req) => {
        const size = value;
        if (!regSize.test(size)) throw new Error('El tamaño o volumen del producto debe tener un máximo de 15 caracteres.');
        return true;
    }),

    body('price').custom((value, req) => {
        const price = value;
        if (!regPrice.test(price)) throw new Error('Debes ingresar el nuevo precio o dejar el actual.');
        return true;
    }),

    body('stock').custom((value, req) => {
        const stock = value;
        if (!regStock.test(stock)) throw new Error('Debes ingresar el stock del producto o dejar el actual.');
        return true;
    }),

    body('expire').custom((value, req) => {
        const expire = value;
        if (!regDate.test(expire)) throw new Error('Formato de fecha invalido.');
        return true;
    }),
];

module.exports = {
    validationsCreate,
    validationsEdit,
};
