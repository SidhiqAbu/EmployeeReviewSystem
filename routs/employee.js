

{
    //  IMPORTING FILES.........
    const express = require('express');
    const route = express.Router();
    const passport =require('passport');
    const employeeController = require('../controllers/employee');
    //  CALLING CONTROLLER .......
    route.get('/employeeAdd',passport.checkAuthentication,employeeController.employeeAdd);
    route.delete('/employeeDelete',passport.checkAuthentication,employeeController.employeeDelete);
    route.put('/update',passport.checkAuthentication,employeeController.update);
    route.put('/feedback',passport.checkAuthentication,employeeController.feedback);
    // EXPORTING ROUTER..........
    module.exports=route;

}