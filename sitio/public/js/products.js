import './modules/isOld.js'
import dropMenu from "./modules/drop-menu.js";
import carrito from './modules/carrito.js';
import { carritoProduct, cambiarCantidad, cantidadProducto } from './modules/addProduct.js';

((c,d)=>{
    d.addEventListener('DOMContentLoaded', e => {
        // Unidad del producto
        const $u = d.querySelector('.unidad-producto'),
              $stock = d.querySelector('.stock-producto');
        $u.textContent = `${cantidadProducto($u.dataset.id)}u`
        localStorage.getItem($u.dataset.id) && d.querySelector('.btn-remove-carrito').classList.remove('d-none');

        cambiarCantidad($stock, $u);

        dropMenu(".btn-drop") //Funcionalidad de menu desplegable al icono de usuario
        //Agrega el producto al localStorage, recibe un boton y una cantidad y un maximo]
        carritoProduct('.btn-add-carrito', '.btn-remove-carrito', $u, $stock) 

        carrito();
    })
})(console, document);