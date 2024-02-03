const PointagesModel = require('../models/PointagesModel')
const authenticateToken = require('../Tools/authanticateToken')

class EmployeController {


 async fetchAllPointages (req , res){
    try {
        // const clt = new ClientModel()
        await authenticateToken(req , res , async () => {
          const month = parseInt(req.params.month, 10);
          const data = await  PointagesModel.AllPointagesModelFunctionByMonth(month)
          res.json(data)
        })
      } catch (error) {
        console.error('Error getting Employe :', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
  }


  async fetcHeurSupByCin(req , res){
    try {
        // const clt = new ClientModel()
        await authenticateToken(req , res , async () => {
          const { condition  } =req.params ;
          const month = parseInt(req.params.month, 10);
          const data = await  PointagesModel.AllHeursupByCin(month,condition)
          res.json(data)
        })
      } catch (error) {
        console.error('Error getting Employe :', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
  }


  async addPointages (req , res){
    try {
      await authenticateToken(req , res , async () => {
        const {date_pointage , presence ,absence , heurSup , Cin_employe } = req.body ;
        
        const data = await  PointagesModel.updatePointagesByDate(date_pointage , presence ,absence , heurSup , Cin_employe)
        res.json({Message : "Pointage added successfully"})
      })
    } catch (error) {
      console.error('Error getting Employe :', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }





}


module.exports = new EmployeController()