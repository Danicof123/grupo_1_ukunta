import validationForm from "./modules/validationForm.js";
import dropMenu from "./modules/drop-menu.js";
import searchMobile from "./modules/searchMobile.js";
import { menuMobile } from "./modules/menuMobile.js";
import scrollObserver from "./modules/scrollObserver.js";

const d = document;

d.addEventListener("DOMContentLoaded", (e) => {
  dropMenu(".btn-drop");
  validationForm(".form-editProduct"); //Envio la clase del formulario para ser evaluada
  searchMobile(".btn-item-search-mb-tb"); //Despliega el input para buscar
  menuMobile(".navbar__bars", ".navbar_ul"); //Crea un menú dinámco con los navbar__item del menu principal
  scrollObserver(); //Una vez cargado todos los menu, se crea un observador para las secciones
});


