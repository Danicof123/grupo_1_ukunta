import geoSelect, { changeGeoSelect, loadGeoSelect } from "./geoForm.js";
import validationForm from "./newValidationForm.js";
import user from "./user.js";

const d = document;
let userProfile;

// Función principal del módulo optProfile---------------------------------------------------------
export default function optProfile(pUserProfile) {
  userProfile = pUserProfile; //Almaceno el usuario que llega por parámetro en una variable global
  // Obtengo todas las opciones
  let $opt = d.querySelectorAll(".profile__nav-row li");

  // Renderizo las opciones habilitadas
  renderOpt(optActive($opt));
  // Evento Click ------------------------------------------------------------------------------------------------
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

  // Cuando hay un evento change (Cambia algo en el formulario)------------------------------------------------------
  d.addEventListener('change', e => {
    // Si el evento lo activa algún input que tenga el data-geo..
    if(e.target.dataset.geo){
      const $form = e.target.parentElement.parentElement,
            $selectToChange = $form.querySelector(`select[data-geo-wait="${e.target.dataset.geo}"]`)
      
      // Al producirse un cambio en un select, se debe cambiar los valores del select dependiente
      if($selectToChange)
        changeGeoSelect($form, $selectToChange, e.target.value)
    }
  })
}


// Devuelve la opt en estado activo----------------------------------------------------------------------//////
const optActive = () => d.querySelector(".profile__nav-row li.active").dataset.opt;

// Renderiza cada opt en estado activo----------------------------------------------------------------------//////
const renderOpt = ($opt) => {
  const $profileOpt = d.querySelector(".profile__set-opt");
  $profileOpt.innerHTML = "";

  $profileOpt.appendChild(allOpt[$opt]());

  // Obtengo el formulario activo
  const $form = $profileOpt.querySelector('form')
  // Validaciones (Recibe un selector de clase)
  validationForm(`.${$form.className}`);
};

export const updateUser = async (userId) => userProfile = await user.getUserById(userId)

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
        $form = $template.querySelector('form'),
        $fragment = d.createDocumentFragment(),
        userAddress = userProfile.address;

    // Llamada al geoSelect------------------
    geoSelect($form);

  // Recorro todas las direcciones que tiene guardada
  userAddress.forEach((ad) => {
    const $clone = d.importNode($template, true);  
    // Select
    const $country = $clone.querySelector('#country'),
          $SelectProvince = $clone.querySelector('#provincias'),
          $SelectCity = $clone.querySelector('#departamentos');
    // Inputs Comunes
    $clone.querySelector('#street').value = ad.street;
    $clone.querySelector('#streetNumber').value = ad.streetNumber;
    $clone.querySelector('#description').value = ad.description;
    
    // Recorre el select de países
    for(let i = 0; i < $country.options.length; i++){
      if($country.options[i].value === ad.country) $country.options[i].selected = true;
    }

    loadGeoSelect($SelectProvince).then(prov => {
      // Recorre el select de las provincias
      for(let i = 0; i < prov.options.length; i++){
        if(prov.options[i].value === ad.state)
          prov.options[i].selected = true;
      }
      loadGeoSelect($SelectCity).then(city => {
      // Recorre el select de las ciudades
        for(let i = 0; i < city.options.length; i++){
          if(city.options[i].value === ad.city)
            city.options[i].selected = true;
        }
      })
    })

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
