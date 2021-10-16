import { Carrito } from "./carrito.js";
import Matematica from "./Matematica.js";

const d = document;

// Agrega un producto al localstorage (id, cantidad)
export const carritoProduct = (btnAdd, btnRemove, $unidad, stock) => {
  d.addEventListener('click', e => {
    const $btnAdd = d.querySelector(btnAdd),
          $btnRemove = d.querySelector(btnRemove),
          id = $btnAdd.dataset.id,
          cantidad = Matematica.rango(Matematica.getNumero($unidad.textContent), 1, stock);
    
    if(e.target === $btnAdd){
      localStorage.setItem(id, cantidad);
      $btnRemove.classList.remove('d-none')
      Carrito.getItems();
    }
    if(e.target === $btnRemove){
      localStorage.removeItem(id);
      $btnRemove.classList.add('d-none')
      Carrito.getItems();
    }
      

  })
};


// Devuelve la cantidad del producto que se encuentra en el localstorage, si no hay devuelve 1
export const cantidadProducto = id => localStorage.getItem(id) || 1;


export const cambiarCantidad = ($stock, $unidad) => {

  let cantidad = Matematica.getNumero($unidad.textContent),
        stock = Matematica.getNumero($stock.textContent);

  d.addEventListener('click', e => {
    if(e.target.matches('.btnSumarCantidad, .btnSumarCantidad *')){
      cantidad = Matematica.rango(cantidad + 1, 0, stock)
    }
    if(e.target.matches('.btnRestarCantidad, .btnRestarCantidad *')){
      cantidad = Matematica.rango(cantidad - 1, 0, stock)
    }
    if(!$unidad) return cantidad;
    
    $unidad.textContent = `${cantidad}u`;
  })
}