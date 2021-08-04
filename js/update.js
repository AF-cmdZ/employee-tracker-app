import inquirer from "inquirer";
const mysql = require("mysql2");
import connection from "./config/connection.js";

// Setup my import variables so they dont delete.
// THIS IS TEMPORARY
console.log(connection);
console.log(mysql);
console.log(inquirer);
// End temporary

module.exports = {
   updateEmpRole: function (eName, rName, cb) {
       inquirer.prompt([
           {
               name: "selectEmployee",
               type: "list",
               choices: eName,
               message: "Choose the employee that needs a role update:",
           },
           {
               name: "newRole",
               type: "list",
               choices: rName,
               message: "Choose the new role for the selected employee:",
           },
       ])
   } 
};