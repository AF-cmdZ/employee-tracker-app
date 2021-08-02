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