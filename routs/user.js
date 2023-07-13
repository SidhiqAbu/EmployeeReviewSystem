


{
  // IMPORTING OF PACKAGES FROM EXPRESS ......
    const express = require('express');
    const route = express.Router();
    const passport =require('passport');
//  IMPORTING OF USERS CONTROLLERS........
    const userController= require('../controllers/user');
    route.post('/signin',passport.authenticate('local-login',{
      successRedirect:'/',
      failureRedirect:'/'
    }));
    route.post('/signup',userController.SignUp);
    route.get('/Profile',userController.Profile);
    route.get('/logout',userController.logout);
   
// EXPORTING OF ROUTER.........
    module.exports=route;

}