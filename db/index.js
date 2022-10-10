const mysql = require('mysql')
 
const connection =  mysql.createConnection()

connection.connect()

const sql = `select * from blog`


function execSQL(sql,callback){
  connection.query(sql,callback)
}

module.exports={
  execSQL
}

