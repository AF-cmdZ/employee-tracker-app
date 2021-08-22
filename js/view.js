const inquirer = require ("inquirer");
const mysql = require("mysql2");
const prompt = require ("inquirer");
const cTable = require("console.table");
const connection = require ("./config/connection.js");

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
    viewAllDepartments: function (cb) {
        connection.query("SELECT * FROM department", (err, results) => {
        if (err) throw err;
        console.table(results);
        cb(results);
        });
    },
    viewDepartmentBudget: function (dList, cb) {
        inquirer.prompt([
            {
                name: "currDept",
                type: "list",
                choices: dlist,
                message: "Select a department:",
            },
        ])
        .then((answers) => {
            let dP = answers.currDept.split(" ");
            let dp = dP[1];

            connection.query(
                'SELECT SUM(role.salary) AS Total, department.name as Department\
                    FROM employee as employee INNER JOIN role as role on employee.role_id = role.id\
                    INNER JOIN department as department ON role.department_id = department.id\
                    LEFT JOIN employee as manager on employee.manager_id = manager.id where department.name = ?',
                    [dp],
                    (err, results) => {
                        if (err) throw err;
                        console.table(results);
                        cb(results);
                    }
            );
        });
    },
};