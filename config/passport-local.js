


{


    // IMPORTING OF PASSPORT AND MONGO DB .......
    var passport = require('passport');
    var LocalStrategy = require('passport-local');
    var User = require('../modules/Users');
//  CREATION OF LOCALSTRATEGY TO AUTHENTICATION OF LOGIN DETAILS.......
    passport.use('local-login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true 
      },async function(req,username, password, done) {
          try {
            let user = await User.find({UserName : username});
              console.log(user[0]);
              if(user[0].Password !== password){
                // console.log("user password not matching!...");
                return done(null,false);
              }
              return done(null,user[0]);
          } catch (error) {
            // console.log("user not fount");
              return done(error);
          }
    }));



//  SERIALIZATION OF USERS INFO.......
    passport.serializeUser(function(user, next) {
            // console.log("serializeUser");
          return next(null, user._id);
      });
//  DESERIALIZATION OF USERS INFO..............
      passport.deserializeUser( async function(_id, next) {
        // console.log("deserializeUser");
          try {
            let user = await User.findById(_id);
            return next(null, user);  
          } catch (error) {
            return next(error);
          }
      });



          
    // check if the user is Authenticated.......
    passport.checkAuthentication = function(req,res,next){
      //  if the user is signed in ,then pass on the requiust to the next function (controller's action)..
      if(req.isAuthenticated()){
          return next();
      }
      //  if the  your not signed in..
      return res.redirect('/');
    }


    // EXPORTING OF PASSPORT ..........
    module.exports=passport;



}