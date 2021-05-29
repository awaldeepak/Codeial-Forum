const passport = require('passport');
const User = require('../models/user');

const LocalStrategy = require('passport-local').Strategy;

//Authentication using passport

passport.use(new LocalStrategy(
    {
        passReqToCallback: true
    },
    function(req, email, password, done){

        //Find the user and establish the identity
        User.findOne({email: email}, function(err, user){

            if(err){

                req.flash('error', err);
                return done(err);
            }

            if(!user || user.password != password){

                req.flash('error', 'Invalid Username/Password');
                return done(null, false);
            }

            return done(null, user);
        });
    }
));


//serialize the user to decide which key is to be stored in the cookies
passport.serializeUser(function(user, done){

    done(null, user.id);
});


//deserialize the user from the key stored in the cookies
passport.deserializeUser(function(id, done){

    User.findById(id, function(err, user){

        if(err){

            req.flash('error', err);
            return done(err);
        }

        return done(null, user);
    })
});


//Check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    //If the user is signed in, then pass on the request to the next function (controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    //If the user is not signed-in
    return res.redirect('/users/sign-in');
}


passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        
        res.locals.user = req.user;
    }

    return next();
}