const db = require('../database/db');
class EmployeModel  {

constructor (matricule , nom) {
    this.nom = nom
    this.matricule = matricule
}

AllPointagesModelFunctionByMonth(month) {
    const sqlQuery =
      "SELECT employes.nom , employes.prenom ,employes.prix , employes.CIN, pointages.absence , pointages.presence, pointages.date_pointage FROM employes LEFT JOIN pointages ON employes.CIN = pointages.Cin_employe AND MONTH(pointages.date_pointage) = ? ";
  
    return new Promise((resolve, reject) => {
      db.query(sqlQuery, [month], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          // Create a map to store unique combinations of nom and cin
          const resultMap = new Map();
  
          // Process the result to convert pointages string to an array
          rows.forEach(row => {
            const key = row.nom + row.CIN;
  
            // If the key does not exist in the map, add it with an array containing the pointages
            if (!resultMap.has(key)) {
              resultMap.set(key, {
                nom: row.nom,
                cin: row.CIN,
                prix: row.prix ,
                prenom:row.prenom , 
                pointages: row.absence !== null ? [{ absence: row.absence, presence: row.presence, date_pointage: row.date_pointage , heurSup : row.heurSup }] : []
              });
            } else {
              // If the key exists, push the pointages to the existing array
              resultMap.get(key).pointages.push(row.absence !== null ?{
                absence: row.absence,
                presence: row.presence,
                date_pointage: row.date_pointage
              } : []);
            }
          });
  
          // Convert the map values to an array
          const result = Array.from(resultMap.values());
  
          resolve(result);
        }
      });
    });
  }
  


// AllHeursupByCin (month){
// const sqlQuery = "SELECT SUM(heurSup) AS Totale , employes.CIN FROM pointages left join employes ON employes.CIN = pointages.Cin_employe WHERE MONTH(date_pointage) = ?  Group by   employes.CIN"
// return new Promise((resolve , reject)=>{
//        db.query(sqlQuery ,[month]  , (err , res) =>{
//            if(err){
//             reject(err)
//            }else{
//             resolve(res)
//            }

//    })
// })
// }
AllHeursupByCin(month, condition) {
  let dateCondition;
  if (condition === 'first15') {
      dateCondition = 'DAY(date_pointage) <= 15';
  } else if (condition === 'last15') {
      dateCondition = 'DAY(date_pointage) > DAY(LAST_DAY(date_pointage)) - 15';
  } else {
      dateCondition = '1'; // No additional date condition
  }

  const sqlQuery = `
      SELECT SUM(heurSup) AS Totale, employes.CIN
      FROM pointages
      LEFT JOIN employes ON employes.CIN = pointages.Cin_employe
      WHERE MONTH(date_pointage) = ? AND ${dateCondition}
      GROUP BY employes.CIN
  `;

  return new Promise((resolve, reject) => {
      db.query(sqlQuery, [month], (err, res) => {
          if (err) {
              reject(err);
          } else {
              resolve(res);
          }
      });
  });
}






  

   convertDateToExactFormat = (datePointageString) => {
    // Convert the input string to a Date object
    const datePointage = new Date(datePointageString);
    
    // Extract day, month, and year
    const day = String(datePointage.getDate()).padStart(2, '0');
    const month = String(datePointage.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = datePointage.getFullYear();
    
    // Format the date as DD/MM/YYYY
    return `${day}/${month}/${year}`;
  };
  
  
  


  updatePointagesByDate(date, presence, absence, heurSup, Cin_employe) {
    return new Promise((resolve, reject) => {
      const selectQuery = "SELECT * FROM pointages WHERE date_pointage = ? AND Cin_employe = ?";
      const insertQuery = "INSERT INTO pointages (date_pointage, presence, absence, heurSup, Cin_employe) VALUES (?, ?, ?, ?, ?)";
  
      // Check if a record already exists for the given date and Cin_employe
      db.query(selectQuery, [date, Cin_employe], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          if (rows.length > 0) {
            let updateQuery = "UPDATE pointages SET ";
            const updateValues = [];
  
            if (date !== "") {
              updateQuery += "date_pointage = ?, ";
              updateValues.push(date);
            }
            if (presence !== "") {
              updateQuery += "presence = ?, ";
              updateValues.push(presence);
            }
            if (absence !== "") {
              updateQuery += "absence = ?, ";
              updateValues.push(absence);
            }
            if (heurSup !== "") {
              updateQuery += "heurSup = ?, ";
              updateValues.push(heurSup);
            }
  
            if (updateValues.length === 0) {
              // No fields to update
              resolve("No fields to update");
              return;
            }
  
            // Remove the trailing comma and add the WHERE clause
            updateQuery = updateQuery.slice(0, -2) + " WHERE date_pointage = ? AND Cin_employe = ?";
            updateValues.push(date, Cin_employe);
  
            db.query(updateQuery, updateValues, (err, res) => {
              if (err) {
                reject(err);
              } else {
                resolve(res);
              }
            });
          } else {
            // If record doesn't exist, insert a new one
            db.query(insertQuery, [date, presence, absence, heurSup, Cin_employe], (err, res) => {
              if (err) {
                reject(err);
              } else {
                resolve(res);
              }
            });
          }
        }
      });
    });
  }
  
  
  


}

module.exports = new EmployeModel();