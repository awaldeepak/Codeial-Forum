const User = require('../models/user');         //Import User Model to use in the actions


//Create an action for the users profile page
module.exports.profile = function(req, res){

    if(req.cookies.user_id){

        User.findById(req.cookies.user_id, function(err, user){
            if(user){
    
                return res.render('user_profile', {
                    title: 'Profile Page',
                    user: user
                });
            }
            else{
                return res.redirect('/users/sign-in');
            }
        });

    }else{
        return res.redirect('/users/sign-in');
    }

}


//Action for the signUp page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title: 'Codeial | Sign Up'
    });
}

//Action for the signIn page
module.exports.signIn = function(req, res){

    if(req.cookies.user_id){

        User.findById(req.cookies.user_id, function(err, user){

            if(user){

                return res.render('user_profile', {
                    title: 'Profile Page',
                    user: user
                });
            }else{

                return res.render('user_sign_in', {
                    title: 'Codeial | Sign In'
                });
            }
        });
    }else{
        return res.render('user_sign_in', {
            title: 'Codeial | Sign In'
        });
    }
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



//Sign in and create a Session
module.exports.createSession = function(req, res){
    //Authentication Steps

    //Find the User
    User.findOne({email: req.body.email}, function(err, user){

        //Handle User Found
        if(user){

            //Handle password which doesn't match
            if(user.password != req.body.password){

                return res.redirect('back');

            }

            //Create a Session if password matches
            res.cookie('user_id', user.id);
            return res.render('user_profile', {
                title: 'Profile Page',
                user: user
            });

        }

        //Handle User not Found
        else{
            res.redirect('back');
        }
        
    });

}


//Sign Out and delete cookie
module.exports.deleteSession = function(req, res){

    if(req.cookies.user_id){

       res.clearCookie('user_id');
       return res.redirect('/users/sign-in');

    }else{

        return res.redirect('/users/sign-in');
    }
}