import './modules/isOld.js'
import dropMenu from "./modules/drop-menu.js";
import validationForm from "./modules/validationForm.js";
import carrito from './modules/carrito.js';
import { menuMobile } from './modules/menuMobile.js';
import scrollObserver from './modules/scrollObserver.js';

((d)=>{
    d.addEventListener('DOMContentLoaded', e => {
        dropMenu(".btn-drop") //Funcionalidad de menu desplegable al icono de usuario
        menuMobile('.navbar__bars', '.navbar_ul') //Crea un menú dinámco con los navbar__item del menu principal
        scrollObserver(); //Una vez cargado todos los menu, se crea un observador para las secciones
        validationForm(".f-contact") //Envio la clase del formulario para ser evaluada
        carrito();
    })
})(document);