import { validationImage } from "./validationImage.js";

const d = document;

export const setAvatar = (userId) => {
  const $setAvatar = d.querySelector(".profile__avatar-add"),
    $inputFile = d.getElementById($setAvatar.dataset.target),
    $contImagen = d.querySelector(".previewImage__newImage"),
    $previewImage = d.querySelector(".previewImage");

  d.addEventListener("click", (e) => {
    // Si click en la camarita📷 -> click en input file
    if (e.target === $setAvatar) $inputFile.click();

    // Si cancela la subida de la imagen
    if (e.target.matches(".previewImage__btn.btn-cancelar")) {
      $inputFile.value = "";
      // Ocultar la ventana modal
      $previewImage.classList.add("d-none");
      // Habilitar el scroll
      d.documentElement.classList.remove("no-scroll");
    }

    // Si acepta la subida de la imagen
    if (e.target.matches(".previewImage__btn.btn-upload")) {
      uploadAvatar(userId, $inputFile.files[0])
        .then(res => {
          // Si existe un mensaje anterior lo elimino
          const beforeMessage = $contImagen.querySelector('.text-warning');
          if(beforeMessage) $contImagen.removeChild(beforeMessage);
          if(res.status === 'error'){
            const message = d.createElement('span');
            message.classList.add('text-warning');
            message.textContent = res.message;

            $contImagen.appendChild(message);
          }
          else{
            // Actualizar imagen
            d.querySelector('.profile__avatar img').src = `/images/users/${res.name}?=${Date.now()}`;
            // ocultar la ventana modal de la imagen
            $previewImage.classList.add("d-none");
            // habilitar el scroll
            d.documentElement.classList.remove("no-scroll");
          }
        });
    }
  });

  // Abrir ventana modal de imagen previa (Sucede cuando hay algun cambio en el input)
  d.addEventListener("change", (e) => {
    // Al cambiar la imagen
    if (e.target === $inputFile) {
      // Crear una url temporal con el archivo
      const urlFile =
          $inputFile.files[0] && URL.createObjectURL($inputFile.files[0]),
        $img = d.querySelector(".previewImage__newImage img");

      // Darle la url al img
      $img.src = urlFile;

      validationImage({
        inputFile: 'profile__avatar-input', //id del input
        limit: 5, //Tamaño en MB
        targetMessage: '.previewImage__newImage', //Donde se crea el mensaje (Selector)
        btnSubmit: '.previewImage__btn.btn-upload' //El boton que envia la imagen (Selector)
      })
      
      // Mostrar la ventana modal de la imagen
      $previewImage.classList.remove("d-none");
      // Deshabilitar el scroll
      d.documentElement.classList.add("no-scroll");
    }
  });
};

// Peticion a la API para subir la imagen de perfil
const uploadAvatar = async (userId, file) => {
  // Creando el formData
  const formData = new FormData();
  formData.append("userId", userId);
  formData.append("avatar", file);
  // Configurando las opciones de envio

  const opt = {
    body: formData,
    method: 'POST'
  };

  try{
    const res = await fetch("/api/users/update/avatar", opt)
    const data = await res.json();  
    return data;
  }
  catch(err){
    return {status: "error", message: "Intenta con una imagen de max 5MB"}
  }
  
}
