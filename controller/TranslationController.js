const fs = require("fs");
const FrTranslation = "./translationFr.json" ;
const EnTranslation = "./translationEn.json";

class TranslationController  {

  
    getRequestController (req , res){

       // Extract the language from the URL parameter
    const lang = req.params.lang;
  
    let filePath = ".";
  
    // Construct the path to the translation file based on the language
    if (lang === "fr") {
      filePath = FrTranslation ;
    } else {
      filePath = EnTranslation;
    }
  
    // Read the JSON file
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error(`Error reading translation file: ${filePath}`, err);
        res.status(500).send("Internal Server Error");
        return;
      }
  
      // Parse the JSON data
      const translationData = JSON.parse(data);
  
      // Send the translation data as the API response
      res.json(translationData);
    });

    }



}



module.exports = new TranslationController()