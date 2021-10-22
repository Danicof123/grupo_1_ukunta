import asuk from "./asuk.js"
const d = document;

export default async function prevProductLoad(id){
  const $template = d.getElementById('prev-product').content,
        $fragment = d.createDocumentFragment(),
        $imgPreviews = d.querySelector('.image-preview');

  let $images = [];
  
  // Guardo el producto
  const data = await asuk.get(`http://127.0.0.1:3000/api/products/detail/${id}`);

  // Guardo el nombre de todas las imágenes q tiene el producto en un array
  data.image.forEach(img => $images.push({id: img.id, name: img.name}));

  $images = $images.slice(0,4) //Defino un máximo de 4 imágenes para trabajar
  $images.forEach(img => {
    const $prevImg = $template.querySelector('.item__preview-img img');
    
    // Configuración de las imágenes
    $prevImg.src = `/images/products/Bebidas/Cervezas/${img.name}`,
    $prevImg.name = img.name,
    $prevImg.dataset.imgId = img.id;
    $prevImg.dataset.prodId = id;

    // Clonar el template, el true sirve para copiar toda la estructura
    const $clone = document.importNode($template, true);
    $fragment.appendChild($clone);
  })

  $imgPreviews.appendChild($fragment)

  activePrevProduct();
}

const activePrevProduct = () => {
  const $images = d.querySelectorAll('.item__preview-img'),
        $mainImage = d.querySelector('.main-product__carrousel');
  
  let tmpSrc = $mainImage.src, tmpAlt = $mainImage.alt;
  
  // Añado la clase active al 1ro
  $images[0].classList.add('active');

  d.addEventListener('click', e => {
    if(e.target.matches('.item__preview-img *')){
      // Pinto a la imagen q le hice click
      $images.forEach((img) => (img.children[0] === e.target) ? img.classList.add('active') : img.classList.remove('active'))

      //La hago principal
      $mainImage.src = e.target.src;
      $mainImage.alt = e.target.alt;
      
      //Guardo las características en un temporal
      tmpSrc = $mainImage.src;
      tmpAlt = $mainImage.alt;
    }
  })

// --------- Mouse adentro -----------------------------------------
  d.addEventListener('mouseover', e => {
    if(e.target.matches('.item__preview-img *')){

      //La hago principal
      $mainImage.src = e.target.src;
      $mainImage.alt = e.target.alt;
    }
  })

// --------- Mouse afuera -----------------------------------------
  d.addEventListener('mouseout', e => {
    if(e.target.matches('.item__preview-img *')){
      // Cuando el mouse sale, vuelvo a los valores del active
      $mainImage.src = tmpSrc;
      $mainImage.alt = tmpAlt;
    }
  })
}