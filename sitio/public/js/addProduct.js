import { getCategory } from "./modules/categoryForm.js";
import validationForm from "./modules/newValidationForm.js";
import { setImageProducts } from "./modules/setImageProducts.js";


const d = document;

d.addEventListener('DOMContentLoaded', (e) => {
    validationForm('.form-addProduct'); //Envio la clase del formulario para ser evaluada
    // Recibe un select y llena las opciones con categorias
    getCategory(d.querySelector('.form-addProduct #category'));
    setImageProducts('.form-addProduct');
});
