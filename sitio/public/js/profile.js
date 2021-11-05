import { modal } from "./components/modals.js";
import optProfile from "./modules/optProfile.js";
import { setAvatar } from "./modules/setAvatar.js";
import updateProfile from "./modules/updateProfile.js";
import user from "./modules/user.js";

document.addEventListener("DOMContentLoaded", (e) => {
  const userId = document.querySelector('main').dataset.userid;
  // Añade la funcionalidad para poder cambiar el avatar usando la 📷
  setAvatar(userId);
  // Una vez carga el profile, se pueden activar las opts
  user.getUserProfile(userId)
    .then(user => { optProfile(user)});

  // Actualizar datos perfil, contacto, contraseña, domicilio, etc
  updateProfile(userId);

  // Modularizar
  document.addEventListener("click", e => {
    if(e.target.matches('.profile__delete-profile *')){
      modal({
        message: "¿Realmente deseas eliminar tu cuenta?",
        btnPrimary: "ACEPTAR",
        btnSecondary: "CANCELAR"
      }, res => {
        if(res) console.log("Hizo click en ACEPTAR");
        else console.log("Hizo click en CANCELAR");
      })
    }
  })

});


