const Connect = require("./connect");

const path = require('path'),
      dirUserDB = path.join(__dirname, '..', 'data', 'users.json');

//Creacion de clase que hereda de Connect
class UserDB extends Connect{
    constructor(dirDB){
        super(dirDB)
    }
    getForRol(value) {
        return this.__database.filter(user => user.rol === value);
    }
}

module.exports = new UserDB(dirUserDB)