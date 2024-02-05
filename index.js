const express = require("express") ;
const app = express();
const cors = require("cors");
const ChantierController = require("./controller/ChantierController");
const LoginController = require("./controller/LoginController");
const TranslationController = require("./controller/TranslationController");
const PointagesController = require("./controller/PointagesController");
const EmployeController = require("./controller/EmployeController");
const PORT = 8080 ;
app.use(cors());
app.use(express.json()) ;

app.get("/api/all/chantier" , ChantierController.fetchAllChantier);
app.get("/api/all/employe" , EmployeController.fetchAllEmploye);
app.get("/api/all/pointages/:month" ,PointagesController.fetchAllPointages);
app.get("/api/all/heur-sup/:month/:condition" ,PointagesController.fetcHeurSupByCin);
app.put("/api/update/employes/:cin" ,EmployeController.UpdateEmploye);
app.put("/api/delete/employes/:cin" ,EmployeController.DeleteEmploye);
app.post("/api/add/employes" ,EmployeController.AddEmployes);
app.post("/api/add/pointages" ,PointagesController.addPointages);
app.post("/login" ,LoginController.checkLoginBymail);
app.get("/locales/:lang/translation",TranslationController.getRequestController);

app.listen(PORT , ()=>{
  console.log(`Server runing in ${PORT}`);
});


