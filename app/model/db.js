const mysql = require("mysql2"); 

require('dotenv').config()
// const connection = mysql.createConnection(process.env.DB_URL)

const connection = mysql.createConnection(process.env.DATABASE_URL)

connection.connect((error)=>{ //check error
    if(error) console.log("MYsql connection " +error);//error : show error
    else console.log("Successfully connected to database");//not error : show success that can connnect to database
});
module.exports = connection; 