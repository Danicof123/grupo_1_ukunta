import './modules/isOld.js'
import dropMenu from "./modules/drop-menu.js";
import carrito from './modules/carrito.js';
import scrollObserver from './modules/scrollObserver.js';

((c,d)=>{
    d.addEventListener('DOMContentLoaded', e => {
        dropMenu(".btn-drop") //Funcionalidad de menu desplegable al icono de usuario
        scrollObserver();
        carrito();
    })
})(console, document);