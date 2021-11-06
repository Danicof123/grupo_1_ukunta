import { modal } from "../components/modals.js";

export const deleteProfile = userId => {
  document.addEventListener("click", e => {
    if(e.target.matches('.profile__delete-profile *')){
      modal({
        message: "¿Realmente deseas eliminar tu cuenta?",
        btnPrimary: "ACEPTAR",
        btnSecondary: "CANCELAR"
      }, res => {
        if(res) console.log("Eliminar Cuenta");
        else console.log("Cancelar eliminación de cuenta");
      })
    }
  })

}
