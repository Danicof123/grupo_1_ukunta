import { carritoProduct, cambiarCantidad, cantidadProducto } from './modules/addProduct.js';
import prevProductLoad from './modules/prevProducts.js';


((c,d)=>{
    d.addEventListener('DOMContentLoaded', e => {
        // Unidad del producto
        const $u = d.querySelector('.unidad-producto'),
              $stock = d.querySelector('.stock-producto'),
              id = $u.dataset.id;

        $u.textContent = `${cantidadProducto(id) || 1}u`

        // Cuando es admin el boton no existe y no se puede eliminar
        if(d.querySelector('.btn-remove-carrito'))
            localStorage.getItem(id) && d.querySelector('.btn-remove-carrito').classList.remove('d-none');
        
        prevProductLoad(id); //Funcionalidad de la vista previa del producto, espera el id del producto.

        // Botones mas y menos, recibe cantidad max y las unidades
        cambiarCantidad($stock, $u);

        //Agrega el producto al localStorage, recibe un boton(Agregar, eliminar) y una cantidad y un maximo]
        carritoProduct('.btn-add-carrito', '.btn-remove-carrito', '.btnRel-add-carrito', $u, $stock.textContent)

    })
})(console, document);