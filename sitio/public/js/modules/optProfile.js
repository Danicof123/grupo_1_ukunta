import geoSelect, { loadGeoSelect } from "./geoForm.js";

const d = document;
let userProfile;

// Función principal del módulo optProfile---------------------------------------------------------
export default function optProfile(pUserProfile) {
  userProfile = pUserProfile; //Almaceno el usuario que llega por parámetro en una variable global
  console.log(userProfile);
  // Obtengo todas las opciones
  let $opt = d.querySelectorAll(".profile__nav-row li");

  // Renderizo las opciones habilitadas
  renderOpt(optActive($opt));

  d.addEventListener("click", (e) => {
    // Cuando le hago click a un opt
    if (e.target.matches(".profile__nav-row li:not([disabled], .active)")) {
      // Quito todos los active y se lo añado al que le hice click
      $opt.forEach((op) =>
        e.target === op
          ? op.classList.add("active")
          : op.classList.remove("active")
      );
      // Vuelvo a renderizar de nuevo las opciones
      renderOpt(optActive($opt));
    }
  });

  // Cuando hay un evento change (Cambia algo en el formulario)--------------------
  d.addEventListener('change', e => {
    // Si el evento lo activa algún input que tenga el data-geo..
    if(e.target.dataset.geo){
      
    }
  })
}

// Devuelve la opt en estado activo
const optActive = () =>
  d.querySelector(".profile__nav-row li.active").dataset.opt;

const renderOpt = ($opt) => {
  const $profileOpt = d.querySelector(".profile__set-opt");
  $profileOpt.innerHTML = "";

  $profileOpt.appendChild(allOpt[$opt]());
};

// ------------------------------------ OPT de Profile --------------------------------------------------------

const profile = () => {
  const $template = d.getElementById("setProfile").content,
    $fragment = d.createDocumentFragment();

  $template.getElementById("name").value = userProfile.name;
  $template.getElementById("lastname").value = userProfile.lastname;
  $template.getElementById("date").value = userProfile.datebirth;

  const $clone = d.importNode($template, true);

  $fragment.appendChild($clone);

  return $fragment;
};
// ------------------------------------ OPT de Password --------------------------------------------------------

const password = () => {
  const $template = d.getElementById("setPassword").content,
    $fragment = d.createDocumentFragment();

  const $clone = d.importNode($template, true);
  $fragment.appendChild($clone);

  return $fragment;
};
// ------------------------------------ OPT de Contact --------------------------------------------------------

const contact = () => {
  const $template = d.getElementById("setContact").content,
    $fragment = d.createDocumentFragment();

  $template.getElementById("phone").value = userProfile.phone;
  $template.getElementById("email").value = userProfile.email;

  const $clone = d.importNode($template, true);

  $fragment.appendChild($clone);

  return $fragment;
};

// ------------------------------------ OPT de address --------------------------------------------------------
const address = () => {
  const $template = d.getElementById("setAddress").content,
    $fragment = d.createDocumentFragment(),
    userAddress = userProfile.address,
    $form = $template.querySelector('form'),
    sizeCountry = $template.querySelector('#country').length;

    // Llamada al geoSelect------------------
    geoSelect($form);

  // Recorro todas las direcciones que tiene guardada
  userAddress.forEach((ad, i) => {
    const $clone = d.importNode($template, true);
    const $country = $clone.querySelectorAll('#country option');
    const $SelectProvince = $clone.querySelector('#province');
    
    // Recorre el select de países
    for(let i = 0; i < sizeCountry; i++){
      if($country[i].value === ad.country) $country[i].selected = true;
    }

    loadGeoSelect($SelectProvince)


    $fragment.appendChild($clone);
  });

  return $fragment;
};

const allOpt = {
  profile,
  password,
  contact,
  address,
};
