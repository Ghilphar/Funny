const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'mysql',
  user: 'root',
  password: 'password',
  database: 'mydb'
});

connection.connect();


//connection.connect((err) => {
//  if (err) throw err;
//  console.log('Connected to the database');
//});

module.exports = connection;
