import { createAlert } from './components/modals.js';
import validationForm from './modules/validationForm.js';

const d = document;

d.addEventListener('DOMContentLoaded', (e) => {
    validationForm('.form-login'); //Envio la clase del formulario para ser evaluada
    // Bienvenida nuevo usuario
    if(localStorage.getItem('newUser')){
      createAlert({status: 'info', message: `Bienvenido ${localStorage.getItem('newUser')} a Ukunta`, time: 6000})
      localStorage.removeItem('newUser');
    }
});

d.addEventListener("DOMContentLoaded", function() {

    
    // icono para poder interaccionar
    let showPassword = d.querySelector('.show-password');

    showPassword.addEventListener('click', () => {
      // elementos input de tipo password
      let password1 = d.querySelector('.password1');
      

      if ( password1.type === "text" ) {
        password1.type = "password"
        
        showPassword.classList.remove('fas fa-eye');
      } else {
        password1.type = "text"
        
        showPassword.classList.toggle("far fa-eye-slash");
      }
  })
});