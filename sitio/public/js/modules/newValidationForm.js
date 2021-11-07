const d = document;

const validationForm = (form) => {
  // Selecciono todos los inputs/textarea que son requeridos
  const $form = d.querySelector(form),
        $rPassword = $form.querySelector(`${form} [data-copy="password"]`)

  $form.addEventListener("blur", e => {
    if(e.target.matches(`${form} [required], ${form} [data-required]`)){
      // Guardo el input y el pattern, para el caso del textarea, el data-pattern
      // Se crean variables para el control de errores
      const $input = e.target,
            pattern = new RegExp($input.pattern || $input.dataset.pattern);
      // Si el pattern no coincide con el valor se crean los errores, caso contrario se borran si estuviesen creados.
      if(!$input.dataset.required && !pattern.test($input.value)) return createError($form, $input)
      else if($input.dataset.required && $input.value.length > 0 && !pattern.test($input.value)) return createError($form, $input)
      else deleteError($form, $input)

      // Si un input tiene doble contraseña...
      if($rPassword && $rPassword.value.length > 0){
        const $password = $form.querySelector(`#${$rPassword.dataset.copy}`);

        if($password.value !== $rPassword.value) {
          createError($form, $password, " (Las contraseñas son diferentes)")
          createError($form, $rPassword, " (Las contraseñas son diferentes)")
        }
        else {
          deleteError($form, $password)
          deleteError($form, $rPassword)
        }
      }

    } 
  }, true)

}

// Crea los errores
const createError = ($form, $input, error) => {
  const $span = d.createElement('span'),
        $ctrlInput = $input.parentElement,
        $error = $ctrlInput.firstElementChild.firstElementChild;

  $form.querySelector('.btn-form').disabled = true;

  $span.id = `span-${$input.id}`
  $span.classList.add('text-danger');
  $span.textContent = error || ` (${$input.title})`;

  // Creación de errores
  $input.classList.add('invalid')
  $error || $ctrlInput.firstElementChild.appendChild($span)
}

// Elimina los errores
const deleteError = ($form, $input) => {
  const $ctrlInput = $input.parentElement,
        $error = $ctrlInput.firstElementChild.firstElementChild;
  
  $form.querySelector('.btn-form').disabled = false;

  $input.classList.remove('invalid')
  $error && $ctrlInput.firstElementChild.removeChild($error)
}

export default validationForm;