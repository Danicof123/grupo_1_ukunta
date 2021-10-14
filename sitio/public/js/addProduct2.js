console.log('addProduct.js vinculado');

const regName = /^[A-Za-zñÑáÁéÉiÍóÓúüÚÜ]{2,45}(\s+[A-Za-zñÑáÁéÉiÍóÓúüÚÜ]{2,45}){0,2}$/;
const regPrice = /^\d*(\.\d{1})?\d{0,1}$/;
const regExpire = /^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/;

window.addEventListener('load', () => {
    /* Validación nombre producto */

    let name = document.querySelector('#form-name');
    let errorName = document.querySelector('#error-name');

    //name.focus();

    name.addEventListener('blur', () => {
        if (!regName.test(name.value)) {
            name.classList.add('is__invalid');
            errorName.innerHTML = 'Debe ingresar el nombre del producto.';
        } else {
            name.classList.remove('is__invalid');
            errorName.innerHTML = null;
        }
    });

    /* Validacion categoria */

    let category = document.querySelector('#form-category');
    let errorCategory = document.querySelector('#error-category');

    category.addEventListener('blur', () => {
        if (category.selectedIndex === 0) {
            category.classList.add('is__invalid');
            errorCategory.innerHTML = 'Debes seleccionar una categoría.';
        } else {
            category.classList.remove('is__invalid');
            errorCategory.innerHTML = null;
        }
    });

    /* Validacion descripcion */

    let description = document.querySelector('#form-description');
    let errorDescription = document.querySelector('#error-description');

    description.addEventListener('blur', () => {
        if (description.textLength < 10 || description.textLength > 255) {
            description.classList.add('is__invalid');
            errorDescription.innerHTML = 'La descripción debe tener un minimo de 10 carácteres y un máximo de 255.';
        } else {
            description.classList.remove('is__invalid');
            errorDescription.innerHTML = null;
        }
    });

    /* Validacion tamaño */

    let size = document.querySelector('#form-size');
    let errorSize = document.querySelector('#error-size');

    size.addEventListener('blur', () => {
        if (size.value.length > 15) {
            size.classList.add('is__invalid');
            errorSize.innerHTML = 'El tamaño o volumen del producto debe tener un máximo de 15 caracteres';
        } else {
            size.classList.remove('is__invalid');
            errorSize.innerHTML = null;
        }
    });

    /* Validacion precio */

    let price = document.querySelector('#form-price');
    let errorPrice = document.querySelector('#error-price');

    price.addEventListener('blur', () => {
        if (!regPrice.test(price.value) || !price.value) {
            price.classList.add('is__invalid');
            errorPrice.innerHTML = 'Debes ingresar el precio en formato número con un máximo de 2 decimales.';
        } else {
            price.classList.remove('is__invalid');
            errorPrice.innerHTML = null;
        }
    });

    /* Validacion stock */

    let stock = document.querySelector('#form-stock');
    let errorStock = document.querySelector('#error-stock');

    stock.addEventListener('blur', () => {
        if (!stock.value || !stock.type === 'number') {
            stock.classList.add('is__invalid');
            errorStock.innerHTML = 'Debes ingresar el stock.';
        } else {
            stock.classList.remove('is__invalid');
            errorStock.innerHTML = null;
        }
    });

    /* Validacion fecha */

    let expire = document.querySelector('#inp-date');
    let errorExpire = document.querySelector('#error-expire');

    expire.addEventListener('blur', () => {
        if (!regExpire.test(expire.value)) {
            expire.classList.add('is__invalid');
            errorExpire.innerHTML = 'Formato de fecha invalido.';
        } else {
            expire.classList.remove('is__invalid');
            errorExpire.innerHTML = null;
        }
    });

    /* Validacion imagen */

    let image = document.querySelector('#form-image');
    let errorImage = document.querySelector('#error-image');

    image.addEventListener('blur', () => {
        if(image.files.length === 0 || image.files.length > 5) { // Mejorar la validación
            image.classList.add('is__invalid')
            errorImage.innerHTML = 'Debes seleccionar de 1 a 5 imagenes, se acepta formato JPG, JPEG Y PNG'
        } else {
            image.classList.remove('is__invalid');
            errorImage.innerHTML = null;
        }
    })

    /* Envio del formulario */

    let formSubmit = document.querySelector('#form-addProduct');
    let errorForm = document.querySelector('#error-form');

    formSubmit.addEventListener('submit', (e) => {
        e.preventDefault();

        let inputsForm = formSubmit.elements;
        let errorsCheck = false;

        for (let i = 0; i < inputsForm.length; i++) {
            if (!inputsForm[i].value) {
                inputsForm[i].classList.add('is__invalid');
                errorForm.innerHTML = 'Los campos en rojo son obligatorios.';
                errorsCheck = true;
            }
        }

        if (!errorsCheck) {
            formSubmit.submit();
        }
    });
});
