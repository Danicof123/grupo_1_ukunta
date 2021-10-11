import dropMenu from "./modules/drop-menu.js";
import validationForm from "./modules/validationForm.js";

((c,d,w)=>{


    d.addEventListener('DOMContentLoaded', e => {
        dropMenu(".btn-drop") //Funcionalidad de menu desplegable al icono de usuario
        validationForm(".f-contact") //Envio la clase del formulario para ser evaluada
    })
})(console, document, window);