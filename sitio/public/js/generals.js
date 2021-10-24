import './modules/isOld.js'
import alertsApp from "./modules/alertsApp.js"
import dropMenu from './modules/drop-menu.js';
import searchMobile from './modules/searchMobile.js';
import { menuMobile } from './modules/menuMobile.js';
import scrollObserver from './modules/scrollObserver.js';
import carrito from './modules/carrito.js';

document.addEventListener('DOMContentLoaded', e => {
  alertsApp.networkStatus(); //Devuelve una alerta si se perdió/Reestableció la conexión
  dropMenu(".btn-drop") //Funcionalidad de menu desplegable al icono de usuario
  searchMobile('.btn-item-search-mb-tb'); //Despliega el input para buscar
  menuMobile('.navbar__bars', '.navbar_ul') //Crea un menú dinámco con los navbar__item del menu principal
  scrollObserver(); //Una vez cargado todos los menu, se crea un observador para las secciones
  carrito();
})