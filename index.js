//Import required Libraries
const express = require('express');                     //For ExpressJS
const app = express();                                  //Calling Express JS
const port = 8000;
const expressLayouts = require('express-ejs-layouts');  //To create Layouts in Express
const db = require('./config/mongoose');                //To include mongoose db conncetion file
const cookieParser = require('cookie-parser');          //To handle cookies


app.use(express.urlencoded());                          //For extracting the values in url of POST method
app.use(cookieParser());
app.use(expressLayouts);
app.use(express.static('./assets'));                    //For accessing the CSS, JS and Images in assets folder
app.use('/', require('./routes'));                      //For routing to the different urls


app.set('view engine', 'ejs');                          //Set default view engine as EJS
app.set('views', './views');                            //To indicate the bowser to look to views folder for the front-end
app.set('layout extractStyles', true);                  //Set to extract the CSS file in layouts from the respecive ejs files
app.set('layout extractScripts', true);                 //Set to extract the JS file in layouts from the respecive ejs files


//To start the server at mentioned PORT
app.listen(port, function(err){
    if(err){
        console.log(`Error in connecting to the server: ${err}`);
    }

    console.log(`Server is up and running on port: ${port}`);
});