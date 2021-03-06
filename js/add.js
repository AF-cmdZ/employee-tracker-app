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
    addEmp: function (rTitle, eManager, cb) {
        inquirer.prompt([
            {
                name: "firstName",
                type: "input",
                message: "Enter first name:",
            },
            {
                name: "lastName",
                type: "input",
                message: "Enter last name:",
            },
            {
                name: "roleId",
                type: "list",
                choices: rTitle,
                message: "Select a role:",
            },
            {
                name: "managerId",
                type: "list",
                choices: eManager,
                message: "Select a Manager",
            },

        ])
        .then((answers) => {
            let fN = answers.firstName;
            let lN = answers.lastName;
            let roleTitle = answers.roleId.split(" ");
            let rT = roleTitle[0];
            let mName = answers.managerId;
            let manId = answers.managerId.split(" ");
            let mId = manId[0];

            if (mName === "none") {
                mName = null;
            } else {
                mName = mId;
            }

            connection.query(
                "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);",
                [fN, lN, rT, mName],
                (err, res) => {
                    if (err) throw err;
                    console.log("A new employee has been added to the database! \n");
                    cb(res);
                }
            );
        });
    },
};