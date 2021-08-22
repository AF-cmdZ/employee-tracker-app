// get the client
const { config } = require ("dotenv");
const mysql = require("mysql2");

// config();
// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.DB_PASS,
  database: "employees_db",
});

// connect to the mysql server and database
connection.connect(function (err) {
	if (err) throw err;
});


module.exports = connection;
