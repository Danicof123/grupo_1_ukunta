import { cantidadProducto, obtenerProductos } from "./addProduct.js";
import asuk from "./asuk.js";

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
      productCarrito();
      $carrito.classList.toggle('active')
      $navbarBottom.classList.toggle('active')
    }
    // Ocultar carrito
    if(e.target.matches(".carritoClose, .carritoClose *") || !e.target.matches(".carrito.active, .carrito.active *,.btnOpenCarrito, .btnOpenCarrito *")){
      $carrito.classList.remove('active')
      $navbarBottom.classList.remove('active')
    }

    // Boton eliminar producto individual del carrito ----------
    if(e.target.matches(".btnEliminarProductoCarrito")){
      // Elimino al producto del LocalStorage
      localStorage.removeItem(e.target.dataset.id)

      // Elimino al producto completo del carrito
      e.target.parentNode.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode.parentNode)
      
      // Vuelvo a calcular el precio total
      precioTotalCarrito();

      // Actualizo los badges de cantidad
      cantidadProductos();
    }
  })
}

// Esta función calcula el precio total del carrito
const precioTotalCarrito = () => {
  const $precioTotal = d.querySelector('.price__carrito'),
        $precioProducto = d.querySelectorAll('.carrito .carrito_precioProducto');
  let acumulador = 0; //Variable temporal
  // Me acumula el precio total
  $precioProducto.forEach(pr => acumulador += Number(pr.textContent.slice(1)))

  // Imprime el precio total
  $precioTotal.textContent = `$${acumulador || "00,00"}`;
}

// Esta función es la que completa el carrito con los productos
const productCarrito = async () => {
  const $template = d.getElementById('carrito__template').content,
        $fragment = d.createDocumentFragment(),
        $carrito = d.querySelector('.carrito'),
        $productosAntiguos = d.querySelectorAll('.producto-contenedor'),
        storageProductos = obtenerProductos();
  
  // Limpia los productos c/vez q abre (Se creo está solución ya que se creaban los productos siempre que se abria el carrito)
  $productosAntiguos.forEach(prA => $carrito.removeChild(prA));
  
  // Por cada producto del LS, pido los datos a la API y los guardo en un arreglo (Promesas)
  let productosByStorage = storageProductos.map(pr => asuk.get(`http://127.0.0.1:3000/api/products/detail/${pr.id}`));

  // Sobreescribo el arreglo con las promesas resueltas
  productosByStorage = await Promise.all(productosByStorage);

  // Recorro y añado dinámicamente los productos al carrito
  productosByStorage.forEach(pr => {
    const $img = $template.querySelector('.carrito__imagenProducto');
    const cantidad = Number(localStorage.getItem(pr.id));
    
    // Añadiendo informacion por cada producto
    $img.src = `/images/products/Bebidas/Cervezas/${pr.image[0].name}`;
    $img.alt = pr.image[0].name;
    $template.querySelector('.carrito_titleProducto').textContent = pr.name;
    $template.querySelector('.carrito_categoriaProducto').textContent = pr.category.name;
    $template.querySelector('.carrito_cantidadProducto').textContent = `Cantidad: ${cantidad}`;
    $template.querySelector('.carrito_precioProducto').textContent = `$${Number(pr.price) * cantidad}`
    $template.querySelector('.btnEliminarProductoCarrito').dataset.id = pr.id;
    
    // Clonar el template, el true sirve para copiar toda la estructura
    const $clone = document.importNode($template, true);
    $fragment.appendChild($clone);
  });
  
  // El empleo de fragmentos es para pegarle al DOM una sola vez y no x c/producto que se agrega al carrito.
  $carrito.appendChild($fragment);

  // Luego de mostrar los productos calculo el precio total
  precioTotalCarrito();
}

// Lo llamo para q se actualicé en el primer momento los badges
cantidadProductos(); 

export default carrito;

export const Carrito = {
  getItems: cantidadProductos
}