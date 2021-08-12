const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname,'users.json');

module.exports = {
  users_db : JSON.parse(fs.readFileSync(usersFilePath),'utf-8'),
  guardarUser : (user) => fs.writeFileSync(usersFilePath, JSON.stringify(user, null, 2), 'utf-8')  
}