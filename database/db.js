const mysql = require('mysql2');

const db = mysql.createConnection({
   host : "localhost" , 
   user : "root" ,
   password : "" ,
   database : "gestion_chantier"
});

module.exports = db ;