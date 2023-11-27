const mysql = require("mysql2"); 

require('dotenv').config()
// const connection = mysql.createConnection(process.env.DB_URL)

// const connection = mysql.createConnection(process.env.DATABASE_URL)

var connection = mysql.createConnection({
    host: 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com',
    port: 4000,
    user: '3cfbwgjaGCZtuWZ.root',
    password: 'S7Ktqvxjn6MPPiko',
    database: 'test',
    ssl: {
      minVersion: 'TLSv1.2',
      rejectUnauthorized: true
    }
  });
connection.connect((error)=>{ //check error
    if(error) console.log("MYsql connection " +error);//error : show error
    else console.log("Successfully connected to database");//not error : show success that can connnect to database
});
module.exports = connection; 