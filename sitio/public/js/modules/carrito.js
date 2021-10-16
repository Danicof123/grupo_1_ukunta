const d = document,
      $carrito = d.querySelector('.carrito');
      

const cantidadProductos = () => {
  // Obtengo el tamaño del localstorage y cambio el numero q indica los productos del carrito
  const $badges = d.querySelectorAll('.btnOpenCarrito .navbar__badge, .length__carrito');
  
  $badges.forEach(b => {
    b.textContent = localStorage.length - 1;
  })
}

  
const carrito = () => {
  const $navbarBottom = d.querySelector('.carrito__navbottom');

  d.addEventListener('click', e => {
    // Mostrar carrito
    if(e.target.matches(".btnOpenCarrito, .btnOpenCarrito *")){
      $carrito.classList.add('active')
      $navbarBottom.classList.add('active')
    }
    // Ocultar carrito
    if(e.target.matches(".carritoClose, .carritoClose *") || !e.target.matches(".carrito.active, .carrito.active *,.btnOpenCarrito, .btnOpenCarrito *")){
      $carrito.classList.remove('active')
      $navbarBottom.classList.remove('active')
    }
  })
}

cantidadProductos();
export default carrito;

export const Carrito = {
  getItems: cantidadProductos
}