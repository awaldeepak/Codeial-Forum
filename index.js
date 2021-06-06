//Import required Libraries
const express = require('express');                     //For ExpressJS
const cookieParser = require('cookie-parser');          //To handle cookies
const app = express();                                  //Calling Express JS
const port = 8000;
const expressLayouts = require('express-ejs-layouts');  //To create Layouts in Express
const db = require('./config/mongoose');                //To include mongoose db conncetion file
//Used for session cookie management
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const flashMWare = require('./config/middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

app.use(express.urlencoded());                          //For extracting the values in url of POST method
app.use(cookieParser());
app.use(express.static('./assets'));                    //For accessing the CSS, JS and Images in assets folder

app.use('/uploads', express.static(__dirname + '/uploads'));    //Make the uploads folder available to the browser
app.use(expressLayouts);
app.set('layout extractStyles', true);                  //Set to extract the CSS file in layouts from the respecive ejs files
app.set('layout extractScripts', true);                 //Set to extract the JS file in layouts from the respecive ejs files

app.set('view engine', 'ejs');                          //Set default view engine as EJS
app.set('views', './views');                            //To indicate the bowser to look to views folder for the front-end


app.use(session({
    name: 'codeial',
    //TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create(
        {
            mongoUrl: 'mongodb://localhost/codeial_development',
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'conncet-mongodb ok');
        })
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(flashMWare.setFlash);

app.use('/', require('./routes'));                      //For routing to the different urls


//To start the server at mentioned PORT
app.listen(port, function(err){
    if(err){
        console.log(`Error in connecting to the server: ${err}`);
    }

    console.log(`Server is up and running on port: ${port}`);
});