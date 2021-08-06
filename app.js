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
            case "Add employee":
                let rTitle = [];
                let eManager = [];
                
                listRole.forEach(({ id, title }) => {
                    rTitle.push(id + " " + title);
                });
                listEmploy.forEach(({ id, first_name, last_name }) => {
                    eManager.push(id + " " + first_name + " " + last_name);
                });
                eManager.push("none");

                addEmp(rTitle, eManager, () => {
                    startProgram();
                });
                break;
            case "Update employee role":
                let eName = [];
                let rName = [];

                listEmploy.forEach(({ id, first_name, last_name }) => {
                    eName.push(id + " " + first_name + " " + last_name);
                });
                listRole.forEach(({ id, title }) => {
                    rName.push(id + " " + title);
                });
                updateEmpRole(eName, rName, () => {
                    startProgram();
                });
                break;
            case "Update employee manager":
                let empName = [];
                let mName = [];

                listEmploy.forEach(({ id, first_name, last_name }) => {
                    empName.push(id + " " + first_name + last_name);
                    mName.push(id + " " + first_name + " " + last_name);
                });
                mName.push("no manager");

                updateEmpManager(empName, mName, () => {
                    startProgram();
                });
                break;
            case "Delete employee":
                let eeName = [];
                
                listEmploy.forEach(({ id, first_name, last_name }) => {
                    eeName.push(id + " " + first_name + " " + last_name);
                });
                deleteEmp(eeName, () => {
                    startProgram();
                });
                break;
            case "Delete role":
                let rrName = [];

                listRole.forEach(({ id, title }) => {
                    rrName.push(id + " " + title);
                });
                deleteRole(rrName, () => {
                    startProgram();
                });
                break;
            case "Delete department":
                let dName = [];

                listDept.forEach(({ id, name }) => {
                    dName.push(id + " " + name);
                });
                deleteDept(dName, () => {
                    startProgram();
                });
                break;
            case "View budget by department":
                let dList = [];

                listDept.forEach(({ id, name }) => {
                    dList.push(id + " " + name);
                });
                viewDepartmentBudget(dList, () => {
                    startProgram();
                });
                break;
            default:
                connection: end();
                process.exit(0);
                break;
        }
    });
};

// Functions to retrieve the data to store in the vars
const getEmployees = () => {
    connection.query("SELECT * FROM employee;", (err, results) => {
        if (err) throw err;
        results.forEach(({ id, first_name, last_name, role_id, manager_id }) => {
            listEmploy.push({ id, first_name, last_name, role_id, manager_id });
        });
    });
    return listEmploy;
};

const getRoles = () => {
    connection.query("SELECT * FROM role;", (err, results) => {
        if (err) throw err;
        results.forEach(({ id, title, salary, department_id }) => {
            listRole.push({ id, title, salary, department_id });
        });
    });
    return listRole;
};

const getDept = () => {
    connection.query("SELECT * FROM department;", (err, results) => {
        if (err) throw err;
        results.forEach(({ id, name }) => {
            listDept.push({ id, name }); 
        });
    });
    return listDept;
}