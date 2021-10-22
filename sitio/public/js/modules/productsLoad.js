import asuk from "./asuk.js";

const d = document;

export const getProducts = async () => {
  let filter = d.getElementById('filterProducts').value;

  filter = filter && `?price=${filter}`

  // Se deberían obtener desde la BD..
  const categorias = ['hidromiel', 'cerveza', 'merchandising'],
        pathCat = d.location.pathname.replace('/store/', '');

  let productos = []; //Guardaré todos los productos
  
  try {
      productos = await asuk.get(`http://127.0.0.1:3000/api/products/${(categorias.includes(pathCat)) ? pathCat : ""}${filter}`);
      printProducts(productos);
  } catch (error) {
    console.log(error);
  }
  finally{
    applyFilter();
  }
}

const applyFilter = () => {
  d.addEventListener('change', e => {
    if(e.target.matches('#filterProducts'))
      getProducts();
  })
}


const printProducts = productos => {
  const $template = d.getElementById('producto-store').content,
        $fragment = d.createDocumentFragment(),
        $main = d.querySelector('main');

  //Antes de pintar limpio el main de posibles residuos;
  $main.innerHTML = "";
  productos.forEach(pr => {
    const $image = $template.querySelector('.imagen-producto__store img');
    const $btnAdd = $template.querySelector('.btnRel-add-carrito');
    
    $template.querySelector('.producto__title').textContent = pr.name;
    $template.querySelector('.producto__description').textContent = pr.description;
    $template.querySelector('.producto__detail').href = `/store/products/${pr.id}`;
    $template.querySelector('.precio_store').textContent = pr.price;

    $image.src = `/images/products/Bebidas/Cervezas/${pr.image[0].name}`;
    $image.alt = pr.image[0].name;

    $btnAdd.dataset.id = pr.id;
    $btnAdd.dataset.stock = pr.stock;

    // Clonación del template
    const $clone = d.importNode($template, true);
    $fragment.appendChild($clone)
  })

  $main.appendChild($fragment);
}