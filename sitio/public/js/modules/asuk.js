// Ukunta asíncrono

const customFetch = (endpoint, options) => {
  const controller = new AbortController();
  options.signal = controller.signal;

  options.method = options.method || "GET";

  options.body = JSON.stringify(options.body) || false;
  if (!options.body) delete options.body;

  setTimeout(() => controller.abort(), 3000);

  return fetch(endpoint, options)
    .then((res) =>res.ok
        ? res.json()
        : Promise.reject({
            error: true,
            status: res.status || "Desconocido",
            statusText: res.statusText || "Ocurrió un error",
          })
    )
    .catch((err) => err);
};


const asuk = {
  post: (url, options = {}) => {
    options.method = "POST";
    return customFetch(url, options);
  },
  get: (url, options = {}) => customFetch(url, options),
  put: (url, options = {}) => {
    options.method = "PUT";
    return customFetch(url, options);
  },
  del: (url, options = {}) => {
    options.method = "DELETE";
    return customFetch(url, options);
  },
};

export default asuk;
