import validationForm from './modules/validationForm.js';

const d = document;

d.addEventListener('DOMContentLoaded', (e) => {
    validationForm('.form-login'); //Envio la clase del formulario para ser evaluada
});