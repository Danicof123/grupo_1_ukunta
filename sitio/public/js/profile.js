import optProfile from "./modules/optProfile.js";
import user from "./modules/user.js";

document.addEventListener("DOMContentLoaded", (e) => {
  const userId = document.querySelector('main').dataset.userid;

  // Una vez carga el profile, se pueden activar las opts
  user.getUserProfile(userId)
    .then(user => { optProfile(user)});
});


