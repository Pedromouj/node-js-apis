const db = require("../database/db") ;


class LoginModel {

constructor (cin , password){
  this.cin = cin ;
  this.password = password ;
}


loginFunction (){
  return new Promise((resolve , reject)=>{
    const SqlQuery = "SELECT * FROM  chef  Where CIN like ?"
    db.query(SqlQuery , [this.cin] , (err , res)=>{
       if(err){
        reject(err)
       }else{   
        resolve(res)
       }

    } )
  })
}

}

module.exports = new LoginModel()