import { getCategory } from "./modules/categoryForm.js";
import { getInfoProduct } from "./modules/getProduct.js";
import validationForm from "./modules/newValidationForm.js";

const d = document;

d.addEventListener("DOMContentLoaded", (e) => {
  validationForm(".form-editProduct"); //Envio la clase del formulario para ser evaluada
  // Recibe un select y llena las opciones con categorias
  getCategory(d.querySelector('.form-editProduct #category'));
  // Recibe un id y trae la info del producto
  getInfoProduct(document.location.pathname.replace('/store/products/edit/',''), ".form-editProduct");
});


