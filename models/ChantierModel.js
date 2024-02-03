const db = require("../database/db") ;
class ChantierModel {
    getAllChantier (){
        return new Promise((resolve , reject)=>{
            const sqlQuery = "SELECT * FROM chantier" ;
            db.query(sqlQuery , (err , res) =>{
             if(err){
                reject(err);
             }else{
                resolve(res);
             }
            })
        })
    }

}
module.exports = new ChantierModel();


