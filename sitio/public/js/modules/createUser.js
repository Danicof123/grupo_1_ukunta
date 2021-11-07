import { createAlert, modal } from "../components/modals.js";

const d = document;

export const createUser = (form) => {
  const $form = d.querySelector(form);
  d.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData($form),
          data = {};
    
    // Obtener los datos del formData
    for (let [key, value] of formData.entries())
      data[key] = value;

    try {
      // Se comprueba q los términos esten aceptados
      if(data.terms !== "on") throw {message: "Debes aceptar los términos y condiciones de uso"};

      // Se elimina la comprobación de contraseña
      delete data.rpassword;
      
      // Configuración de opciones
      const opt = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': "application/json"
        }
      }

      // peticion a la API via FETCH
      fetch("/api/users/create", opt)
        .then(res => res.json())
        .then(dataR => {
          // Limpiando errores anteriores
          limpiarErroresForm($form)
          // Control de errores
          if(dataR.status === 'error'){
            const errores = dataR.errors.errors;
            errores.forEach(err => {
              const $span = d.createElement('span');
              $span.classList.add('text-danger');
              $span.textContent = ` (${err.msg})`;
              $form.querySelector(`[for=${err.param}]`).appendChild($span);
            })
            // Limpio los campos de contraseñas
            $form.querySelector('#password').value = "";
            $form.querySelector('#rpassword').value = "";
            createAlert({status: "warning", message: "Se encontraron errores y no se creó el usuario"})
          }
          else if(dataR.status === 'success'){
            localStorage.setItem('newUser', data.name)
            d.location.href = `${d.location.origin}/users/login`;
          }
        })
    } catch (error) {
      console.log(error);
      modal({
        message: error.message,
        btnPrimary: "ACEPTAR"
      })
    }    
  })
  d.addEventListener('click', e => {
    if(e.target.matches('.btn-form-cancel')) d.location.href = `${d.location.origin}/home`;
  })
}

const limpiarErroresForm = ($form) => {
  const labels = $form.querySelectorAll('label');
  labels.forEach(lb => {
    const $span = lb.querySelector('span');
    $span && lb.removeChild($span)
  })
}
