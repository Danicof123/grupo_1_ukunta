import { modal } from "../components/modals.js";
const d = document;

export const setImageProducts = (form) => {
  const $inputFile = d.getElementById("producto-images-input"),
        $addImage = d.querySelector(`${form} .addImage`),
        $controladorImage = d.querySelector('.controlador-add-image');
  
  // Arreglo donde voy a guardar mis imágenes
  let files = [];

  d.addEventListener('click', e => {
    if(e.target.matches('.btn-form-cancel')) d.location.href = d.location.origin;
    if(e.target === $addImage) $inputFile.click();
    
    //Eliminación de imagen 
    if(e.target.matches('.product__previewImage, .product__previewImage *')){
      const $imgToDelete = e.target.parentElement.children[1];
      files = files.filter(e => e.lastModified != $imgToDelete.dataset.id);
      $controladorImage.removeChild(e.target.parentElement);

      // Oculto el agregar imagenes si hay mas de 4
      (files.length >= 4) ? $addImage.classList.add('d-none') : $addImage.classList.remove('d-none')
      
      // Si no hay imágenes con errores elimino la advertencia y habilito el botón
      if(!$controladorImage.querySelector('img.invalid')){
        const $span = $inputFile.parentElement.children[0].querySelector('span');
        $span && $inputFile.parentElement.children[0].removeChild($span);

        d.querySelector(`.btn-form`).disabled = false;
      }
    }
  })

  d.addEventListener('change', e => {
    if(e.target === $inputFile){

      // No dejo q pase las 4 imágenes
      files = [...files, ...Array.from($inputFile.files)];
  
      // Oculto el agregar imagenes si hay mas de 4
      (files.length >= 4) ? $addImage.classList.add('d-none') : $addImage.classList.remove('d-none')
      
      // Elimino los elementos extras
      files = files.slice(0,4);

      // Agrego las previsualizaciones
      $controladorImage.innerHTML = '';
      $controladorImage.appendChild($addImage);
      $controladorImage.appendChild(addPreviewImage(files, $inputFile));
    }
  })

  d.addEventListener('submit', e => {
    if(e.target.matches(form)){
      e.preventDefault();
      const $form = d.querySelector(form);
      // Creando el formData
      const formData = new FormData($form);

      // Imagenes a enviar
      delete formData.delete('images');
      files.forEach(img => formData.append('images', img));

      const opt = {
        body: formData,
        method: 'POST'
      };

      try {
        if(files.length < 1) throw {message: "No se ha seleccionado ninguna imagen"}
        
        fetch("/api/products/create", opt)
          .then(resJson => resJson.json())
          .then(res => {
            console.log(res);
            if(res.status === "success") 
              d.location.href = `${d.location.origin}/store/products/${res.producto}`
          });

      } catch (err) {
        modal({
          message: err.message,
          btnPrimary: "ACEPTAR"
        })
      }   
    }
  })
}

// Agrega las imágenes previas al formulario
const addPreviewImage = (files, $inputFile) => {
  const $fragment = d.createDocumentFragment();
  files.forEach(e => {
    // Creacion elementos
    const $containerImage = d.createElement('div'),
          $iconDelete = d.createElement('i'),
          $img = d.createElement('img');

    // Contenido
    $containerImage.classList.add('mb-6','tb-3','product__previewImage');
    $iconDelete.classList.add('product__deletePreviewImage','bx','bx-x-circle');
    $img.src = URL.createObjectURL(e);
    $img.alt = e.name;
    $img.dataset.size = e.size;
    $img.dataset.type = e.type;
    $img.dataset.id = e.lastModified;

    if(!validationImages($img, $inputFile)){
      const error = $inputFile.parentElement.children[0].querySelector('span');

      const $span = d.createElement('span');
      $span.classList.add('text-danger');
      $span.textContent = ` (${$inputFile.title})`;

      !error && $inputFile.parentElement.children[0].appendChild($span)
      $img.classList.add('invalid');
      d.querySelector(`.btn-form`).disabled = true;
    }

    // Construccion
    $containerImage.appendChild($iconDelete);
    $containerImage.appendChild($img);
    $fragment.appendChild($containerImage);
  })

  return $fragment;
}


// Controla las imágenes
const validationImages = (file, $inputFile) => {
  const accept = $inputFile.accept.split(", ");
  const maxSize = 5 * 1024 * 1024;

  if(!accept.includes(file.dataset.type)) return false;
  if(Number(file.dataset.size) > maxSize) return false;
  return true;
}