const config = require("dotenv").config();
const inquirer = require ("inquirer");
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.DB_PASS,
    database: "employees_db",
  });

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
        let employeeId = answers.selectEmployee.split(" ");
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
        let employeeId = answers.selectEmployee.split(" ");
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