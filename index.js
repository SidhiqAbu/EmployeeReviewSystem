



{

    

    // Calling of the all required Pakages...........
    const express = require('express');
    const expressEjsLayouts = require('express-ejs-layouts');
    const path = require('path');
    const port= 7779;
    const app = express();

    // connecting to mongoose..
    const db=require('./config/mongoose');
    const passport = require('passport');
    const passportLocal = require('./config/passport-local');
    const session=require('express-session');
    const MongoStore= require('connect-mongo');

    app.use(express.urlencoded({extended:false}));



    // Configoration for all static file.........
    app.set('view engine','ejs');
    app.set('views' , path.join(__dirname,'views'));
    app.use(expressEjsLayouts);
    app.use(express.static('./assets'));



        
    //  mongo is used to storing the loging session cookies in db......................
    app.use(session({
        name :'LoginForm',
        // todo changes before diploying in to production mode.........................
        secret : 'blahsomething',
        saveUninitialized:false,
        resave : false,
        cookie:{
            maxAge:(1000 * 60 * 100)
        },
        store: MongoStore.create({
            secret: 'topsecret',
            mongoUrl:'mongodb://127.0.0.1:27017/HiFi_Company',
            autoRemove:'disabled'
        })
    }));

    app.use(session());
    app.use(passport.initialize());
    app.use(passport.session());

    // linking routes with app to get request and responces......
    app.use('/',require('./routs/home'));
   
    // Listening of port and call back for Error handling..........
    app.listen(port,function(error){
        if(error){
            console.log(error);
            return;
        }
        console.log('Server running on port',port);
    });



}