const mysql = require("mysql2"); 

require('dotenv').config()

// var connection = mysql.createConnection({
//     host: 'localhost',
//     port: 3306,
//     user: 'root',
//     password: 'root',
//     database: 'project',
//   });
var connection = mysql.createConnection(process.env.TiDB_URL)
connection.connect((error)=>{ //check error
    if(error){
      console.log("MYsql connection " +error);//error : show error
      connection.destroy();
    } 
    else console.log("Successfully connected to database");//not error : show success that can connnect to database
});
module.exports = connection; 