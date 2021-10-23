import './modules/isOld.js'
import dropMenu from "./modules/drop-menu.js";
import carrito from './modules/carrito.js';
import { carritoProduct } from './modules/addProduct.js';
import { getProducts } from './modules/productsLoad.js';
import scrollObserver from './modules/scrollObserver.js';

((c,d,w)=>{
    d.addEventListener('DOMContentLoaded', e => {
        dropMenu(".btn-drop") //Funcionalidad de menu desplegable al icono de usuario
        scrollObserver();
        getProducts(); //Obtiene todos los productos
        carritoProduct(null, null, '.btnRel-add-carrito')
        carrito();
    })
})(console, document, window);