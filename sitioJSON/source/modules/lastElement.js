// Devuelve el valor del índice desde atrás;
Array.prototype.lastElement = function(i = 0){
    return (this.length > i ) ? this[this.length -1 -i] : this[0];
}

