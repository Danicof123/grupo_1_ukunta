import { modal } from "../components/modals.js";
const d = document;

export const setImageProducts = (form, images) => {
  const $inputFile = d.getElementById("producto-images-input"),
        $addImage = d.querySelector(`${form} .addImage`),
        $controladorImage = d.querySelector('.controlador-add-image');
  
  // Arreglo donde voy a guardar mis imágenes
  let files = images || [];
  d.addEventListener('click', e => {
    if(e.target.matches('.btn-form-cancel')) d.location.href = d.location.origin;
    if(e.target === $addImage) $inputFile.click();
    
    //Eliminación de imagen 
    if(e.target.matches('.product__previewImage, .product__previewImage *')){
      const $imgToDelete = e.target.parentElement.children[1];

      let filesTemp = []
      // Elimino la imagen que clickeo
      files.forEach(img => {
        if(img.lastModified){
          if(img.lastModified != $imgToDelete.dataset.id) filesTemp.push(img) 
        }
        else{
          if(img.dataset.id != $imgToDelete.dataset.id){
            filesTemp.push(img) 
          }
        }
      });

      files = filesTemp;
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

      // Imagenes a enviar (Elimino las que ya existen)
      delete formData.delete('images');
      const imgBefore = files;
      files = files.filter(f => f.lastModified)
      files && files.forEach(img => formData.append('images', img));

      let url = "/api/products/create"
      const opt = {
        body: formData,
        method: 'POST'
      };

      // En caso de actualizar
      if(form === ".form-editProduct"){
        const idProduct = document.location.pathname.replace('/store/products/edit/','')
        formData.append('idProduct', idProduct)
        url = `/api/products/update/${idProduct}`;
        opt.method = "PUT";

      }

      try {
        if(imgBefore.length < 1) throw {message: "No se ha seleccionado ninguna imagen"}
        
        fetch(url, opt)
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
    $img.src = e.src || URL.createObjectURL(e);
    $img.alt = e.name;
    $img.dataset.size = e.size || 0;
    $img.dataset.type = e.type || null;
    $img.dataset.id = e.id || e.lastModified || e.dataset.id;

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
  if(file.dataset.type !== "null" && !accept.includes(file.dataset.type)) return false;
  if(Number(file.dataset.size) > maxSize) return false;
  return true;
}