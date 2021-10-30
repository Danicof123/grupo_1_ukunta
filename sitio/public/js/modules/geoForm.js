import removeAccents from "../utils/removeAccents.js";
import asuk from "./asuk.js";

const d = document;

// Carga el formulario
const geoForm = ($form) => {
  const $selectAll = $form.querySelectorAll("select[data-geo]");
  // Recorre todos los select con data-geo, si el que se tiene que esperar no tiene valor, queda deshabilitado
  $selectAll.forEach((s) => {
    const $dataWait = s.dataset.geoWait;
    if($dataWait)
      ($form.querySelector(`select[data-geo="${$dataWait}"]`).value) 
        ? s.disabled = false 
        : s.disabled = true;
  });

  return $form;
};


export const loadGeoSelect = async ($select) => {
  const dataGeo = $select.dataset.geo,
        dataWait = $select.dataset.geoWait,
        $form = $select.parentElement.parentElement,
        $fragment = d.createDocumentFragment();

  // Si el select tiene que esperar otro select...
  if(dataWait){
    const selectToWait = $form.querySelector(`select[data-geo="${dataWait}"]`);
    const selectCountry = $form.querySelector(`select[data-geo="country"]`);
    
    // Si el select a esperar tiene algun valor, se procede a activar y rellenar segun los valores de la API correspondiente
    if(selectToWait.value){
      $select.disabled = false;
      // Obtener API según corresponda
      let geoAPI = apiCountry[selectCountry.value][dataGeo]
      
      // Si la API corresponde a un municipio, se agrega el valor del dataWait
      if(dataGeo === "departamentos") geoAPI += `"${selectToWait.value}"&max=5000`

      // Traer los datos de la API
      const dataAPI = await asuk.get(geoAPI);
      
      
      // Ordenar alfabeticamente
      const dataName = dataAPI[dataGeo].map(data => data.nombre).sort();

      // Añadir los nombres a los options de c/select
      dataName.forEach(name => {
        const $option = d.createElement('option');
        $option.value = removeAccents(name);
        $option.text = name;

        $fragment.appendChild($option)
      })
      $select.appendChild($fragment);
      return $select;
    }
  }
}


export const changeGeoSelect = async ($form, $select, $value) => {
  const selectCountry = $form.querySelector(`select[data-geo="country"]`),
        dataGeo = $select.dataset.geo,
        $option = d.createElement('option'),
        $fragment = d.createDocumentFragment();

  // Resetear Select     
  $select.innerHTML = "";
  $option.selected = true;
  $option.disabled = true;
  $option.text = `Elige una ${dataGeo === 'municipios' ? 'ciudad' : dataGeo}`;
  $select.appendChild($option);

  // Obtener API según corresponda
  let geoAPI = apiCountry[selectCountry.value][dataGeo]
        
  // Si la API corresponde a un municipio, se agrega el valor del dataWait
  if(dataGeo === "departamentos") geoAPI += `"${$value}"&max=1000`

  // Traer los datos de la API
  const dataAPI = await asuk.get(geoAPI);

  // Ordenar alfabeticamente
  const dataName = dataAPI[dataGeo].map(data => data.nombre).sort();
  // Añadir los nombres a los options de c/select
  dataName.forEach(name => {
    const $option = d.createElement('option');
    $option.value = removeAccents(name);
    $option.text = name;

    $fragment.appendChild($option)
  })

  $select.appendChild($fragment);
  return $select;
}




// Tiene las Api de países/provincias/ciudades
const apiCountry = {
  Argentina: {
    provincias : "https://apis.datos.gob.ar/georef/api/provincias",
    departamentos: "https://apis.datos.gob.ar/georef/api/departamentos?provincia="
  }
};

export default geoForm;
