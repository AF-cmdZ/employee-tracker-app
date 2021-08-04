import { config } from "dotenv";
import inquirer from "inquirer";
const mysql = require("mysql2");
import prompt from "inquirer";
import connection from "./config/connection.js";

// Setup my import variables so they dont delete.
// THIS IS TEMPORARY
console.log(config);
console.log(connection);
console.log(prompt);
console.log(cTable);
console.log(mysql);
console.log(inquirer);
// End temporary

module.exports = {
    addDepartment: function (newDept, cb) {
        connection.query(
            "INSERT INTO department (name) VALUES (?);",
            newDept,
            (err, res) => {
                if (err) throw err;
                console.log("Department has been added! \n");
                cb(res);
            }
        );
    },
    addRole: function (title, salary, departmentId, cb) {
        connection.query(
            "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);",
            [title, salary, departmentId],
            (err, res) => {
                if (err) throw err;
                console.log("role has been added to the database! \n");
                cb(res);
            }
        );
    },
};