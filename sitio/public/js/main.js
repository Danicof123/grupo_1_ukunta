import modal from "./components/modals.js";
import validationForm from "./modules/validationForm.js";

((d)=>{
    d.addEventListener('DOMContentLoaded', e => {    
        validationForm(".f-contact") //Envio la clase del formulario para ser evaluada
        // modal({
        //     message: "Esta es una ventana modal de prueba",
        //     btnPrimary: "ACEPTAR",
        //     btnSecondary: "CANCELAR"
        // }, res => {
        //     if(res){
        //         console.log(res)
        //     }
        //     else{
        //         console.log(res)
        //     }
        // })
    })
})(document);