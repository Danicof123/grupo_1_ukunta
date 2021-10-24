import carrito from './modules/carrito.js';
import { menuMobile } from './modules/menuMobile.js';
import searchMobile from './modules/searchMobile.js';
import validationForm from './modules/validationForm.js';

const d = document;

d.addEventListener('DOMContentLoaded', (e) => {
    validationForm('.form-addProduct'); //Envio la clase del formulario para ser evaluada
    searchMobile('.btn-item-search-mb-tb');
    menuMobile('.navbar__bars', '.navbar_ul');
    carrito();
});
