import asuk from "./asuk.js";
import { setImageProducts } from "./setImageProducts.js";

const d = document;

export const getInfoProduct = async (idProduct, form) => {
  const product = await asuk.get(`/api/products/detail/${idProduct}`);
  const $form = d.querySelector(form);
  const data = {...product};

  // Quito elementos de no interes para rellenar el formulario
  delete data.id;
  delete data.category;
  delete data.image;

  // Completo los datos del formulario
  for(let key in data){
    $form.elements[key].value = data[key];
  }

  // Completo la imágenes
  const $containerImage = $form.querySelector('.controlador-add-image');
  if(product.image.length >= 4) $containerImage.querySelector('.addImage').classList.add('d-none');
  $containerImage.appendChild(getImage(product.image));

  // Obtengo las imagenes con los nuevos datos
  const images = Array.from($containerImage.querySelectorAll('img'));
  
  // Después de completar la información del formulario con los datos del producto
  setImageProducts('.form-editProduct', images);
}


// Agrega las imágenes previas al formulario
const getImage = (images) => {
  const $fragment = d.createDocumentFragment();
  images.forEach(e => {
    // Creacion elementos
    const $containerImage = d.createElement('div'),
          $iconDelete = d.createElement('i'),
          $img = d.createElement('img');

    // Contenido
    $containerImage.classList.add('mb-6','tb-3','product__previewImage');
    $iconDelete.classList.add('product__deletePreviewImage','bx','bx-x-circle');
    $img.src = `/images/products/Bebidas/Cervezas/${e.name}`
    $img.alt = e.name;
    $img.dataset.id = e.id;

    // Construccion
    $containerImage.appendChild($iconDelete);
    $containerImage.appendChild($img);
    $fragment.appendChild($containerImage);
  })

  return $fragment;
}

