import { createUser } from "./modules/createUser.js";
import validationForm from "./modules/newValidationForm.js";


const d = document;

d.addEventListener('DOMContentLoaded', (e) => {
    validationForm('.form-register');
    createUser('.form-register');
});

// d.addEventListener('DOMContentLoaded', function () {
//     // icono para poder interaccionar
//     let showPassword = d.querySelector('.show-password');

//     showPassword.addEventListener('click', () => {
//         // elementos input de tipo password
//         let password1 = d.querySelector('.password1');
//         let password2 = d.querySelector('.password2');

//         if (password1.type === 'text' && password2.type === 'text') {
//             password1.type = 'password';
//             password2.type = 'password';
//             showPassword.classList.remove('fas fa-eye');
//         } else {
//             password1.type = 'text';
//             password2.type = 'text';
//             showPassword.classList.toggle('far fa-eye-slash');
//         }
//     });
// });
