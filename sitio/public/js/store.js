import './modules/isOld.js'
import dropMenu from "./modules/drop-menu.js";
import carrito from './modules/carrito.js';
import { carritoProduct } from './modules/addProduct.js';
import { getProducts } from './modules/productsLoad.js';
import scrollObserver from './modules/scrollObserver.js';
import { menuMobile } from './modules/menuMobile.js';
import searchMobile from './modules/searchMobile.js';

((d)=>{
    d.addEventListener('DOMContentLoaded', e => {
        dropMenu(".btn-drop") //Funcionalidad de menu desplegable al icono de usuario
        searchMobile('.btn-item-search-mb-tb'); //Despliega el input para buscar
        menuMobile('.navbar__bars', '.navbar_ul') //Crea un menú dinámco con los navbar__item del menu principal
        scrollObserver(); //Una vez cargado todos los menu, se crea un observador para las secciones
        getProducts(); //Obtiene todos los productos
        carritoProduct(null, null, '.btnRel-add-carrito')
        carrito();
    })
})(document);

