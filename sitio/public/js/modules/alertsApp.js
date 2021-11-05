import { createAlert } from "../components/modals.js";

const n = navigator;

const isOnline = e => {
  if(n.onLine) 
    createAlert({status: "success", message: "Se ha restablecido la conexión"})
  else
    createAlert({status: "warning", message: "Se ha perdido la conexión"})
};

const networkStatus = () => {
  addEventListener("offline", (e) => isOnline());
  addEventListener("online", (e) => isOnline());
};

const alertsApp = {
  networkStatus,
};

export default alertsApp;
