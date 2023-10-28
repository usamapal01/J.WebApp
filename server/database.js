const mysql = require('mysql2');

require("dotenv").config();


let conn = mysql.createConnection({
  host: process.env.DATABASE_HOST || "localhost",
  user: process.env.DATABASE_USER || "root",
  password: process.env.DATABASE_PASSWORD || "password",
  database: process.env.DATABASE || "database-1",
  connectionLimit:10
  });

conn.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Server!');
})


exports = module.exports = conn;