const d = document;
export const menuMobile = (btnAct, ContMenu) => {
  const $ContMenu = d.querySelector(ContMenu),
        $mobileMenu = d.createElement('nav');

  // Creación de nodo clone 
  const $clone = document.importNode($ContMenu, true);
  // Le agrego los items al menu
  Array.from($clone.children).forEach(el => $mobileMenu.appendChild(el))
  $mobileMenu.classList.add('navbar__menu-mobile');
  d.body.appendChild($mobileMenu);

  d.addEventListener('click', e => {
    if(e.target.matches(`${btnAct}, ${btnAct} *`)){
      $mobileMenu.classList.add('active')
      d.body.classList.add('no-scroll')      
    }

    if(e.target.matches(`.navbar__back, .navbar__menu-mobile .navbar__item *`)){
      $mobileMenu.classList.remove('active')
      d.body.classList.remove('no-scroll')
    }
  })
}