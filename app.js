// imports
import cTable from "console.table";
import { config } from "dotenv";
import prompt from "inquirer";
import connection from "./config/connection.js";
const mysql = require("mysql2");
const inquirer = require("inquirer");
const figlet = require("figlet");
const cTable = require("console.table");
const view = require("./js/view.js");
const questions = require("./js/questions.js");
const { viewDepartmentBudget } = require("./js/view.js");
const { updateEmpRole, updateEmpManager } = require("./js/update.js");
const { addEmp } = require("./js/add.js");
const { deleteEmp, deleteRole, deleteDept } = require("./js/delete");

// variables
// empty array variables to hold data later on
let listEmploy = [];
let listRole = [];
let listDept = [];

// Setup my import variables so they dont delete.
// THIS IS TEMPORARY
console.log(listEmploy);
console.log(listRole);
console.log(listDept);
console.log(prompt);
console.log(cTable);
console.log(mysql);
console.log(inquirer);

// END TEMP SECTION
config();

connection.connect((err) => {
    if (err) throw err;
    console.log(
        // Start Banner! 
        figlet.textSync("Employee Manager", {
            font: "Standard",
            horizontalLayout: "default",
            verticalLayout: "default",
            width: 60, 
            whitespaceBreak: true,
        })
    );
    startProgram();
  });

//   Start of program 
const startProgram = async () => {
    // populate empty array vars with data
    listEmploy = await getEmployees();
    listRole = await getRoles();
    listDept = await getDept();

    inquirer.prompt(questions.startMenu).then(({ action }) => {
        console.log(action);
        switch (action) {
            case "View all employees":
                view.viewAllEmployees(() => {
                    startProgram();
                });
                break;
            case "View all roles":
                view.viewAllRoles(() => {
                    startProgram();
                });
                break;
            case "View all departments":
                view.viewAllDepartments(() => {
                    startProgram();
                });
                break;
            case "Add department":
                inquirer.prompt(questions.addDepartmentName).then(({ newDept }) => {
                    add.addDepartment(newDept, () => {
                        startProgram();
                });
            });
                break;
            case "Add role":
                inquirer.prompt(questions.addNewRole).then((answers) => {
                    add.addRole(
                        answers.title,
                        answers.salary,
                        answers.departmentId,
                        () => {
                            startProgram();
                        }
                    );
                });
                break;
                
        }
    }
}

