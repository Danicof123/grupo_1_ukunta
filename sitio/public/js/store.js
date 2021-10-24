import './modules/isOld.js'
import { carritoProduct } from './modules/addProduct.js';
import { getProducts } from './modules/productsLoad.js';

((d)=>{
    d.addEventListener('DOMContentLoaded', e => {
        getProducts(); //Obtiene todos los productos
        carritoProduct(null, null, '.btnRel-add-carrito')
    })
})(document);

