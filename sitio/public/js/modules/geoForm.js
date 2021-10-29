import asuk from "./asuk.js";

const d = document;

// Carga el formulario
const geoForm = ($form) => {
  const $selectAll = $form.querySelectorAll("select[data-geo]");
        
  $selectAll.forEach((s) => {
    const $dataWait = s.dataset.geoWait;
    ($dataWait) ? s.disabled = true : s.disabled = false;
  });
};

export const loadGeoSelect = ($select) => {
  const dataGeo = $select.dataset.geo,
        dataWait = $select.dataset.geoWait,
        $form = $select.parentElement.parentElement;

  // Si el select tiene que esperar otro select...
  if(dataWait){
    const selectToWait = $form.querySelector(`select[data-geo="${dataWait}"]`);
    
    // Si el select a esperar tiene algun valor, se procede a activar y rellenar segun los valores de la API correspondiente
    if(selectToWait.value){
      $select.disabled = false;

      const $option = d.createElement('option');

      $option.value = "Prueba";
      $option.text = "Pruebaaa";

      $select.appendChild($option);
    }
  }
}



// Tiene las Api de países/provincias/ciudades
const apiCountry = {
  Argentina: {
    province : "https://apis.datos.gob.ar/georef/api/provincias",
    city: "https://apis.datos.gob.ar/georef/api/municipios?provincia=6"
  }
};

export default geoForm;
