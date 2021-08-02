const questions = {

    startMenu: [
        {
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View all employees",
                "View all roles",
                "View all departments",
                "Add department",
                "Add role",
                "Add employee",
                "Update employee role",
                "Update employee manager",
                "Delete employee",
                "Delete role",
                "Delete department",
                "View budget by department",
                "Exit",
            ],
        },
    ],
    addNewRole: [
        {
            name: "title",
            type: "input",
            message: "What is the title of the new role?",   
        },
        {
            name: "salary",
            type: "number",
            message: "What is the new salary of the new role?",
        },
        {
            name: "departmentId",
            type: "number",
            message: "Department Id for new role?",
        },
    ],
    addDepartmentName: [
        {
            name: "newDept",
            type: "input",
            message: "What is the name of the department?",
        },
    ],
};
module.exports = questions;