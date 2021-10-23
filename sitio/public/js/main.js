import './modules/isOld.js'
import dropMenu from "./modules/drop-menu.js";
import validationForm from "./modules/validationForm.js";
import carrito from './modules/carrito.js';
import { menuMobile } from './modules/menuMobile.js';

((d)=>{
    d.addEventListener('DOMContentLoaded', e => {
        dropMenu(".btn-drop") //Funcionalidad de menu desplegable al icono de usuario
        menuMobile('.navbar__bars', '.navbar_ul')
        validationForm(".f-contact") //Envio la clase del formulario para ser evaluada
        carrito();
    })
})(document);