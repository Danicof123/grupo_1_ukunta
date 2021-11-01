import optProfile, { updateUser } from "./optProfile.js";
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
          updateUser(userId)
        }
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => e.target.matches('.form-password') && e.target.reset())
    
  })
}


export default updateProfile;