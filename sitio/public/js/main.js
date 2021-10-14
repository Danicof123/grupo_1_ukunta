import './modules/isOld.js'
import dropMenu from "./modules/drop-menu.js";
import validationForm from "./modules/validationForm.js";
import carrito from './modules/carrito.js';

((c,d,w)=>{


    d.addEventListener('DOMContentLoaded', e => {
        dropMenu(".btn-drop") //Funcionalidad de menu desplegable al icono de usuario
        validationForm(".f-contact") //Envio la clase del formulario para ser evaluada
        carrito();
    })
})(console, document, window);