const ChantierModel = require("../models/ChantierModel");

class ChantierController {

 async fetchAllChantier (req , res){
    try {   
     const data = await ChantierModel.getAllChantier() ; 
     res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({error : "Problem of the server !"  })
    }
 }

}



module.exports = new ChantierController()