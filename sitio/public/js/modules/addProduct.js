import { Carrito } from "./carrito.js";
import Matematica from "./Matematica.js";

const d = document;

// Agrega un producto al localstorage (id, cantidad)
export const carritoProduct = (btnAdd, btnRemove, btnRel, $unidad, stock) => {
  // Defino los botones a utilizar;
  const $btnAdd = d.querySelector(btnAdd),
        $btnRemove = d.querySelector(btnRemove);

  d.addEventListener("click", (e) => {

    // El boton de agregar al carrito
    if ($btnAdd && e.target === $btnAdd) {
      const id = $btnAdd.dataset.id, //Consigo el id del producto con el cual operar
            cantidad = ($unidad) ? Matematica.getNumero($unidad.textContent) : localStorage.getItem(id);

      addProductoToLocalStorage(id, cantidad, stock);
      $btnRemove && $btnRemove.classList.remove("d-none");
      Carrito.getItems(); //Actualiza los badges
    }

    // El boton para eliminar del carrito
    if ($btnRemove && e.target === $btnRemove) {
      const id = $btnAdd.dataset.id; //Consigo el id del producto con el cual operar
      RemoveProductoToLocalStorage(id);
      $btnRemove.classList.add("d-none");
      Carrito.getItems(); //Actualiza los badges
    }

    // Botones de productos relacionados para agregar/sumar +1 al carrito
    if(btnRel && e.target.matches(`${btnRel}, ${btnRel} *`)){
      const $btnRel = e.target,
            id = Number($btnRel.dataset.id),
            stock = Number($btnRel.dataset.stock);
      let cantidad = Number(cantidadProducto(id));

      addProductoToLocalStorage(id, cantidad + 1, stock)
      Carrito.getItems(); //Actualiza los badges
    }

  });
};

const addProductoToLocalStorage = (id, cantidad, stock) => localStorage.setItem(id, Matematica.rango(cantidad, 1, stock));
const RemoveProductoToLocalStorage = id => localStorage.removeItem(id);

// Devuelve la cantidad del producto que se encuentra en el localstorage, si no hay devuelve 1
export const cantidadProducto = (id) => localStorage.getItem(id) || 0;

export const cambiarCantidad = ($stock, $unidad) => {
  let cantidad = Matematica.getNumero($unidad.textContent),
    stock = Matematica.getNumero($stock.textContent);

  d.addEventListener("click", (e) => {
    if (e.target.matches(".btnSumarCantidad, .btnSumarCantidad *")) {
      cantidad = Matematica.rango(cantidad + 1, 1, stock);
    }
    if (e.target.matches(".btnRestarCantidad, .btnRestarCantidad *")) {
      cantidad = Matematica.rango(cantidad - 1, 1, stock);
    }
    if (!$unidad) return cantidad;

    $unidad.textContent = `${cantidad}u`;
  });
};

// Esta función me devuelve un arreglo de objetos con los productos que estan en el LS, en forma de {id: cantidad}
export const obtenerProductos = () => {
  const productos = [];
  for (const key in localStorage) {
    if (Number(key) && Object.hasOwnProperty.call(localStorage, key))
      productos.push({
        id : key,
        cantidad : localStorage[key]
      })
  }
  return productos;
}

