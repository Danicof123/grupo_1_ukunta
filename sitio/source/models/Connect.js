require('../modules/lastElement');
const fs = require('fs');

// Clase abstracta encargada de la conexión a las BD;
class Connect{
    constructor(dirDB){
        this.__dirDB = dirDB; //Guarda la dirección de la DB(Se obtiene por parámetro)
        this.__database = JSON.parse(fs.readFileSync(this.__dirDB, 'utf-8'))
    }
    //Reescribir la BD (JSON)
    __saveDB(data){
        fs.writeFileSync(this.__dirDB, JSON.stringify(data, null, 2), 'utf-8')
    }
    // Elimina un elemento, recibe un id para saber cual eliminar
    delete(id){
        this.__database = this.__database.filter(element => element.id !== id)
        this.__saveDB(this.__database)
    }
    // Agrega un elemento, el que llega por parámetro
    add(elemento, id){
        if(id){
            elemento.id = id
        } else{
            elemento.id = this.__database.length + 1;
        }
        console.log(elemento);    
        this.__database.push(elemento);
        this.__saveDB(this.__database);
    }
    // Comprueba si el id existe en la BD
    comprobarId(id){
        return id && !!this.__database.find((e) => e.id === id);
    }

    // Devuelve la BD completa
    get getDB() {
        return this.__database;
    }
    // Recibe clave, valor, devuelve elemento coincidente
    getFind(key, value) {
        return this.__database.find(e => e[key] === value);
    }

    // Actualiza un elemento de la bd
    set setElement(obj){
        // Obtengo el elemto de la BD segun el obj.id
        let element = this.getFind('id', obj.id)
        // Sobreescribo las props que existen en obj
        element = {...element, ...obj}
        
        // elimino el elemento viejo
        this.delete(element.id)

        // añado el nuevo
        this.add(element, obj.id);
    }
}

// exportamos la clase
module.exports = Connect;
