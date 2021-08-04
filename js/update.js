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
       .then((answers) => {
        //    Store the ids for later use
        let employeeId = answers.selectedEmployee.split(" ");
        let eId = employeeId[0];
        let roleId = answers.newRole.split(" ");
        let rId = roleId[0];

        connection.query(
            "UPDATE employee SET role_id = ? WHERE id = ?;",
            [rId, eId],
            (err, results) => {
                if (err) throw err;
                console.log("New role has been updated!");
                cb(results);
            }
        );
       });
   },
   updateEmpManager: function (empName, mName, cb) {
       inquirer.prompt([
           {
               name: "selectEmployee",
               type: "list",
               choices: empName,
               message: "Choose the employee that needs a manager update:",
           },
           {
               name: "selectEmployee",
               type: "list",
               choices: mName,
               message: "Choose a new manager for the selected employee",
           },
       ])
       .then((answers) =>{
        //    Store the ids for later use
        let employeeId = answers.selectedEmployee.split(" ");
        let managerId = answers.selectManager.split(" ");
        let mN = answers.selectManager;
        let eId = employeeId[0];
        let mId = managerId[0];

        if (mN === "no manager") {
            mN = null;
        } else {
            mn = mId;
        }
        connection.query(
            "UPDATE employee SET manager_id = ? WHERE id = ?;",
            [mN, eId],
            (err, results) => {
                if (err) throw err;
                console.log("New manager has been updated!");
                cb(results);
            }
        );
       });
   },
};