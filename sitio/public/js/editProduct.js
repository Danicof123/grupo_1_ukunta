import validationForm from './modules/validationForm.js';
import dropMenu from './modules/drop-menu.js'

const d = document;

d.addEventListener('DOMContentLoaded', (e) => {
    dropMenu(".btn-drop")
    validationForm('.form-editProduct'); //Envio la clase del formulario para ser evaluada
});