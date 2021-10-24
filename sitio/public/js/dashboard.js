import carrito from "./modules/carrito";
import dropMenu from "./modules/drop-menu";
import { menuMobile } from "./modules/menuMobile";
import scrollObserver from "./modules/scrollObserver";
import searchMobile from "./modules/searchMobile";

document.addEventListener("DOMContentLoaded", (e) => {
  const $msgalert = document.querySelector(".msg-alert");

  $msgalert.addEventListener("click", (e) => {
    $msgalert.classList.add("d-none");
  });

  dropMenu(".btn-drop");
  searchMobile(".btn-item-search-mb-tb"); //Despliega el input para buscar
  menuMobile(".navbar__bars", ".navbar_ul"); //Crea un menú dinámco con los navbar__item del menu principal
  scrollObserver(); //Una vez cargado todos los menu, se crea un observador para las secciones
  carrito();
});

