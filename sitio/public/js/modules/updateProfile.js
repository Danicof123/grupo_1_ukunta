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

    // Crear las opciones
    const opt = { 
      method: "POST", 
      body: JSON.stringify(data),
      headers: {
        'Content-Type': "application/json"
      }
    }
    fetch("/api/users/update/profile", opt )
      .then(data => data.json())
      .then(res => {
        if(res.status === "success"){
          console.log(res.message);
          updateUser(userId)
        }
      })
    
  })
}


export default updateProfile;