const d = document,
  n = navigator;

const isOnline = e => {
  const $alert = d.createElement("div");
  $alert.classList.add("alert", "active");

  // Limpio si hay una alerta anterior activa
  const $oldAlert = d.querySelector('.alert.active');
  $oldAlert && d.body.removeChild($oldAlert);

  if(n.onLine){
    $alert.classList.remove("alert-error");
    $alert.classList.add("alert-success");
    $alert.textContent = "Se ha restablecido la conexión a internet...";
  }
  else{
    $alert.classList.remove("alert-success");
    $alert.classList.add("alert-error");
    $alert.textContent = "Se perdió la conexión a internet...";
  }
  d.body.insertAdjacentElement("afterbegin", $alert);

  setTimeout(() => {
    $alert.classList.contains('active') && $alert.classList.remove('active');
  }, 3 * 1000);

  setTimeout(() => {
    $alert.classList.contains('active') && d.body.removeChild($alert);
  }, 4 * 1000);

};

const networkStatus = () => {
  addEventListener("offline", (e) => isOnline());
  addEventListener("online", (e) => isOnline());
};

const alertsApp = {
  networkStatus,
};

export default alertsApp;
