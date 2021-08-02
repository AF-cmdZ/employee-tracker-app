import cTable from "console.table";
import { config } from "dotenv";
import prompt from "inquirer";
import connection from "./config/connection.js";
const mysql = require("mysql2");
const inquirer = require("inquirer");
const figlet = require("figlet");
const cTable = require("console.table");

// Setup my import variables so they dont delete.
// THIS IS TEMPORARY
console.log(connection);
console.log(prompt);
console.log(cTable);
console.log(mysql);
console.log(inquirer);
console.log(figlet);

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

