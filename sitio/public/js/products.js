import './modules/isOld.js'
import dropMenu from "./modules/drop-menu.js";
import carrito from './modules/carrito.js';
import { carritoProduct, cambiarCantidad, cantidadProducto } from './modules/addProduct.js';
import prevProductLoad from './modules/prevProducts.js';
import searchMobile from './modules/searchMobile.js';
import { menuMobile } from './modules/menuMobile.js';
import scrollObserver from './modules/scrollObserver.js';

((c,d)=>{
    d.addEventListener('DOMContentLoaded', e => {
        // Unidad del producto
        const $u = d.querySelector('.unidad-producto'),
              $stock = d.querySelector('.stock-producto'),
              id = $u.dataset.id;

        $u.textContent = `${cantidadProducto(id) || 1}u`
        localStorage.getItem(id) && d.querySelector('.btn-remove-carrito').classList.remove('d-none');
        
        dropMenu(".btn-drop") //Funcionalidad de menu desplegable al icono de usuario
        searchMobile('.btn-item-search-mb-tb'); //Despliega el input para buscar
        menuMobile('.navbar__bars', '.navbar_ul') //Crea un menú dinámco con los navbar__item del menu principal
        scrollObserver(); //Una vez cargado todos los menu, se crea un observador
        
        prevProductLoad(id); //Funcionalidad de la vista previa del producto, espera el id del producto.

        // Botones mas y menos, recibe cantidad max y las unidades
        cambiarCantidad($stock, $u);

        //Agrega el producto al localStorage, recibe un boton(Agregar, eliminar) y una cantidad y un maximo]
        carritoProduct('.btn-add-carrito', '.btn-remove-carrito', '.btnRel-add-carrito', $u, $stock.textContent)

        carrito(); //Toda la funcionalidad del carrito
    })
})(console, document);