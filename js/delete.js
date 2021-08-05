import inquirer from "inquirer";
const mysql = require("mysql2");
import connection from "./config/connection.js";

module.exports {
    deleteEmp: function (eeName, cb) {
        inquirer.prompt([
            {
                name: "selectEmp",
                type: "list",
                choices: eeName,
                message: "Select the employee to be deleted:",
            },
        ])
        .then((answers) => {
            // storing vars for later use
            let employeeID = answers.selectEmp.split(" ");
            let eID = employeeID[0];

            connection.query(
                "DELETE FROM employee W
            )
        })
    }
};