import { config } from "dotenv";
const mysql = require("mysql2");
import prompt from "inquirer";
import connection from "./config/connection.js";
const cTable = require("console.table");

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
    viewAllEmployees: function (cb) {
        connection.query(
            'SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name as department, concat(manager.first_name, " ", manager.last_name) as Manager \
            FROM employee as employee INNER JOIN role as role on employee.role_id = role.id \
            INNER JOIN department as department ON role.department_id = department.id \
            LEFT JOIN employee as manager on employee.manager_id = manager.id ORDER BY employee.id;',
            (err, results) => {
                if (err) throw err;
                console.table(results);
                cb(results);
            }
        );
    },
    viewAllRoles: function (cb) {
        connection.query("SELECT * FROM role", (err, results) => {
            if (err) throw err;
            console.table(results);
            cb(results);
        });
    },
    viewAllDepartments:
}