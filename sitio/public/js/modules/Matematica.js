const rango = (num, min = -Infinity, max = Infinity) => (num < min) ? min : (num > max) ? max : num

// Devuelve los numeros que empiezen en un string
const getNumero = string => Number(string.match(/^\d+/)[0]) || 0;

const Matematica = {
  rango,
  getNumero,
}


export default Matematica;