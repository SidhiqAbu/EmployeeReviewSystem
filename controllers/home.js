

{


    // IMPORTING DATA FROM MONGO DB.....
    const Employees = require('../modules/Users');
    const RgtrEmployees = require('../modules/registeredEmployees');


    //  INNITIAL CALL HOME PAGE
    module.exports.home = async function(req,res){
        console.log("hii bro");
        if(req.isAuthenticated()){
            return res.redirect(`/home/Profile`);
        }
    
            res.render('home',{
                title:"home Page",
            });
    };



}


