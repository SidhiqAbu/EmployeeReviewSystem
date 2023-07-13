

{
    //  IMPORTING EXPRESS.......
    const express = require('express');
    const route = express.Router();
    route.use(express.urlencoded());
    //  IMPOERTING CONTROLLER ACTIONS..
    const homeController= require('../controllers/home'); 
    route.get('/',homeController.home);
    route.use('/home',require('./user'));
    route.use('/home',require('./employee'));
    module.exports=route;

}