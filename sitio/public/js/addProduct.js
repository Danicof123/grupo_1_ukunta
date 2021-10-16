import carrito from './modules/carrito.js';
import validationForm from './modules/validationForm.js';

const d = document;

d.addEventListener('DOMContentLoaded', (e) => {
    validationForm('.form-addProduct'); //Envio la clase del formulario para ser evaluada
    carrito();
});
