const d = document;

export default function searchMobile(btnAct){
  const $contSearch = d.querySelector('.container-search-mobile-tablet');
  d.addEventListener('click', e => {
    //Si el formulario de busqueda esta activado, lo puedo desactivar
    if($contSearch.classList.contains('active'))
      if(!e.target.matches('.container-search-mobile-tablet form *')){
        d.body.classList.remove('no-scroll');
        $contSearch.classList.remove('active');
      }

    if(e.target.matches(btnAct)){
      $contSearch.classList.toggle('active');
      d.body.classList.add('no-scroll');
    }
  })

  // Impedir envio si el formulario esta vacio
  d.addEventListener('submit', e => {
    if(e.target.matches('.container-search-mobile-tablet form')) 
      d.querySelector('.container-search-mobile-tablet input[type="search"]').value || e.preventDefault();
  })
}