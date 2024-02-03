const db = require('../database/db');
class EmployeModel  {



AllEmployeModelFunction (){
 const sqlQuery = "SELECT * FROM   employes";
 return new Promise ((resolve , reject) => {
     db.query(sqlQuery , (err , res) => {
         if(err){
            reject(err)
         }else{
            resolve(res)
         }
     })
  })
}

InsertEmploye (CIN , Nom  , Prenom , prix ,	date_debut , numChantier ){
    const sqlQuery = "INSERT INTO employes  (CIN , nom  , prenom , prix ,	date_debut , numChantier ) VALUES (? , ? , ? , ? , ? , ?)";
    return new Promise ((resolve , reject) => {
        db.query(sqlQuery ,[CIN , Nom  , Prenom , prix ,	date_debut, numChantier ],(err , res) => {
            if(err){
               reject(err)
            }else{
               resolve(res)
            }
        })
     })
   }

   UpdateEmployee(CIN, Nom, Prenom, prix , numChantier ) {
    let sqlQuery = "UPDATE employes SET";
    const params = [];
    const updateFields = [];

    if (Nom !== undefined) {
        updateFields.push("nom = ?");
        params.push(Nom);
    }

    if (Prenom !== undefined) {
        updateFields.push("prenom = ?");
        params.push(Prenom);
    }

    if (prix !== undefined) {
        updateFields.push("prix = ?");
        params.push(prix);
    }

    if (numChantier !== undefined) {
        updateFields.push("numChantier = ?");
        params.push(numChantier);
    }

    sqlQuery += ` ${updateFields.join(', ')} WHERE CIN = ?`;
    params.push(CIN);
  console.log("sqlQuery" , sqlQuery , "params" , params)
    return new Promise((resolve, reject) => {
        db.query(sqlQuery, params, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
    }




deleteEmployeByCin (cin){
    const sqlQuery = "UPDATE employes SET status = -1 WHERE  CIN  like ? ";
    return new Promise ((resolve , reject) => {
        db.query(sqlQuery ,[cin],(err , res) => {
            if(err){
               reject(err)
            }else{
               resolve(res)
            }
        })
     })


}

  


}

module.exports = new EmployeModel();