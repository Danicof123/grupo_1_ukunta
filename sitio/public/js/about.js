import './modules/isOld.js'
import dropMenu from "./modules/drop-menu.js";
import carrito from './modules/carrito.js';
import scrollObserver from './modules/scrollObserver.js';
import { menuMobile } from './modules/menuMobile.js';
import searchMobile from './modules/searchMobile.js';

((c,d)=>{
    d.addEventListener('DOMContentLoaded', e => {
        dropMenu(".btn-drop") //Funcionalidad de menu desplegable al icono de usuario
        searchMobile('.btn-item-search-mb-tb');
        menuMobile('.navbar__bars', '.navbar_ul');
        scrollObserver();
        carrito();
    })
})(console, document);