const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  port:3306,
  password: "s2p00y0@gmail.com",
  database: "recipe_app"
});

module.exports = db;
