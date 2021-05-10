const User = require('../models/user');         //Import User Model to use in the actions


//Create an action for the users profile page
module.exports.profile = function(req, res){
    return res.render('user_profile', {
        'title': 'Profile Page'
    });
}


//Action for the signUp page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        'title': 'Codeial | Sign Up'
    });
}

//Action for the signIn page
module.exports.signIn = function(req, res){
    return res.render('user_sign_in', {
        'title': 'Codeial | Sign In'
    });
}


//Get the Sign Up data and proceed with it.
module.exports.create = function(req, res){

    //If password is not matching with confirm password
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    //If password matches with confirm password, then find email to preceed with actions
    User.findOne({email: req.body.email}, function(err, user){
        
        if(err){ console.log('Error in finding user in signing up'); return; }

        //If Entered email user is not available in User Model then create that user and redirect to sign-in page
        if(!user){
            User.create(req.body, function(err, user){

                if(err){ console.log('Error in creating user while signing up'); return; }

                return res.redirect('/users/sign-in');
            });
            
        }

        //If entered email user is already exists then redirect to previous page
        else{
            return res.redirect('back');
        }
    });
}



//sign in and create a session