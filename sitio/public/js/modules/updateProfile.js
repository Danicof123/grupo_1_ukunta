import { createAlert } from "../components/modals.js";
import { updateUser } from "./optProfile.js";
import user from "./user.js";

const d = document;
const updateProfile = (userId) => {
  d.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {}

    // Obtener los datos del formData
    for (let [key, value] of formData.entries())
      data[key] = value; 
    // Agregar el id del usuario
    data.userId = userId;

    // Configuración de url
    let url = "/api/users/update/profile";
    if(e.target.matches('.form-password')){
      url = "/api/users/update/password";
      delete data.rpassword;
    }
    if(e.target.matches('.form-address')) url = "/api/users/update/address";
  
    // Crear las opciones
    const opt = { 
      method: "PUT", 
      body: JSON.stringify(data),
      headers: {
        'Content-Type': "application/json"
      }
    }

    fetch(url, opt )
      .then(data => data.json())
      .then(res => {
        if(res.status === "success"){   
          // Creo la alerta si esta todo Ok
          createAlert({status: "success", message: res.message})

          updateUser(userId).then(u => {
            if(e.target.matches('.form-profile')) 
              d.querySelector('.profile__name').textContent = user.getUserFullName(u)
          })
        }else{
          createAlert({status: "warning", message: res.message})
        }
      })
      .catch(err => {
        createAlert({status: "warning", message: err.message})
      })
      .finally(() => e.target.matches('.form-password') && e.target.reset())
    
  })
}


export default updateProfile;