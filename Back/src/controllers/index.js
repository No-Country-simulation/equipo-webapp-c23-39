const { catchedAsync } = require("../utils");
const userController = require("./userController.js"); 


module.exports = {
  register: catchedAsync(userController.register),  
  login: catchedAsync(userController.login),
 

};