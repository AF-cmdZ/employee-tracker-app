import inquirer from "inquirer";
const mysql = require("mysql2");
import connection from "./config/connection.js";

module.exports = {
    deleteEmp: function (eeName, cb) {
        inquirer.prompt([
            {
                name: "selectEmp",
                type: "list",
                choices: eeName,
                message: "Select the employee to be deleted:"
            },
        ])
        .then((answers) => {
            // storing vars for later use
            let employeeID = answers.selectEmp.split(" ");
            let eID = employeeID[0];

            connection.query(
                "DELETE FROM employee WHERE id = ?;",
                [eID],
                (err, results) => {
                    if (err) throw err;
                    console.log("Employee has been deleted.");
                    cb(results);
                }
            );
        });
    },
        deleteRole: function (rrName, cb) {
            inquirer.prompt([
                {
                    name: "selectR",
                    type: "list",
                    choices: rrName,
                    message: "Select the role to be deleted:"
                },
            ])
            .then((answers) => {
                let roleId = answers.selectR.split(" ");
                let rID = roleId[0];

                connection.query(
                    "DELETE FROM role WHERE id = ?;",
                    [rID],
                    (err, results) => {
                        if (err) throw err;
                        console.log("Role has been deleted.");
                        cb(results);
                    }
                );
            });
        },
            deleteDept: function (dName, cb) {
                inquirer.prompt([
                    {
                    name: "selectD",
                    type: "list",
                    choices: dName,
                    message: "Select the department to delete:"
                    },
                ])
                .then((answers) => {
                    let deptId = answers.selectD.split(" ");
                    let dID = deptId[0];

                    connection.query(
                        "DELETE FROM department WHERE id = ?;",
                        [dID],
                        (err, results) => {
                            if (err) throw err;
                            console.log("Department has been deleted.");
                            cb(results);
                        }
                    );
                });
            },
};