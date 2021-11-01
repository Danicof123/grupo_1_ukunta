import asuk from "./asuk.js";

const d = document;

// Obtengo el usuario segun el id, este se encuentra en la etiqueta main[data-userid]
const getUserById = id => asuk.get(`http://127.0.0.1:3000/api/users/${id}`);

const getUserAvatar = user => user.avatar;
const getUserFullName = user => user.name + " " + user.lastname;

const getUserProfile = async id => {
  const user = await getUserById(id);
  const $avatar = d.querySelector('.profile__avatar img'),
        $fullName = d.querySelector('.profile__name');

  $avatar.src = `/images/users/${getUserAvatar(user)}`;
  $avatar.alt = getUserAvatar(user);

  $fullName.textContent = getUserFullName(user);
  return user;
}

const user = {
  getUserById,
  getUserAvatar,
  getUserFullName,
  getUserProfile,
}

export default user;