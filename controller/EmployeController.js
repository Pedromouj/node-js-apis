const EmployeModel = require('../models/EmployeModel')
const authenticateToken = require('../Tools/authanticateToken')

class EmployeController {


 async fetchAllEmploye (req , res){
    try {
        // const clt = new ClientModel()
        await authenticateToken(req , res , async () => {
          const data = await  EmployeModel.AllEmployeModelFunction()
          res.json(data)
        })
      } catch (error) {
        console.error('Error getting Employe :', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
  }



  
 async AddEmployes (req , res){
  try {
      // const clt = new ClientModel()
      await authenticateToken(req , res , async () => {
      const    {CIN , nom , prenom , prix ,	date_debut , numChantier } = req.body ;
        const data = await  EmployeModel.InsertEmploye(CIN , nom , prenom , prix ,	date_debut, numChantier );
        res.json({Message : "Employe Added successfully"})
      })
    } catch (error) {
      console.error('Error getting Employe :', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}



async UpdateEmploye (req , res){
  try {
      // const clt = new ClientModel()
      await authenticateToken(req , res , async () => {
      const { nom , prenom , prix  ,numChantier } = req.body ;
      const { cin } = req.params;
          await  EmployeModel.UpdateEmployee(cin ,nom , prenom , prix , numChantier );
        res.json({Message : "Employe Updated successfully"})
      })
    } catch (error) {
      console.error('Error getting Employe :', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}



async DeleteEmploye (req , res){
  try {
      // const clt = new ClientModel()
      await authenticateToken(req , res , async () => {
      const { cin } = req.params;
      await  EmployeModel.deleteEmployeByCin(cin);
        res.json({Message : "Employe Deleted successfully"})
      })
    } catch (error) {
      console.error('Error getting Employe :', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}



}


module.exports = new EmployeController()