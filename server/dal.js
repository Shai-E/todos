const mysql = require("mysql2");

const DbName = "todos_db";

const connection = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "1234",
  database: DbName,
});

connection.connect((err) => {
  if (err) {
    console.log(err);
    console.log("Try to change the connection credentials. Visit dal.js");
  }
  console.log(`We're connected to ${DbName} on MySQL`);
});

const execute = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    connection.execute(sql, params, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};

module.exports = { execute };
