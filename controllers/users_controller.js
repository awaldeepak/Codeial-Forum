const User = require('../models/user');         //Import User Model to use in the actions
const fs = require('fs');
const path = require('path');

//Create an action for the users profile page
module.exports.profile = function(req, res){

    if(req.isAuthenticated()){
        User.findById(req.params.id, function(err, user){
            if(err){ req.flash('error', err); return res.redirect('back'); }

                return res.render('user_profile', {
                    title: 'Profile Page',
                    profile_user: user
                });
        });

    } else {
        return res.render('user_sign_in', {
            title: 'Codeial | Sign In'
        });
    }
   
}

//Action to update the user profile
module.exports.update = async function(req, res){
    // if(req.user.id == req.params.id){

    //     User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
    //         if(err){ console.log('Error in updating user'); return; }
    //         req.flash('success', 'Details updated');
    //         return res.redirect('back');
    //     });
    // } else {

    //     return res.status(401, 'UnAuthorized');
    // }

    if(req.user.id == req.params.id){
    
        try{
            
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if(err){console.log("*****Multer Error", err);}

                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){

                    if(user.name){
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }

                    //This is the saving path of the uploaded file into the avatar field in th user
                    user.avatar = User.avatarPath + '/' +req.file.filename;
                }
                user.save();
                req.flash('success', 'Details updated');
                return res.redirect('back');
            });

        } catch(err) {
            req.flash('error', err);
            return res.redirect('back');
        }

    } else {
        req.flash('error', 'UnAuthorized');
        return res.status(401, 'UnAuthorized');
    }

}

//Action for the signUp page
module.exports.signUp = function(req, res){

    //Redirect the user to his profile page if user is already signed in 
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up', {
        title: 'Codeial | Sign Up'
    });
}

//Action for the signIn page
module.exports.signIn = function(req, res){

    //Redirect the user to his profile page if user is already signed in 
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in', {
        title: 'Codeial | Sign In'
    });
}


//Get the Sign Up data and proceed with it.
module.exports.create = async function(req, res){

    try{
        //If password is not matching with confirm password
        if(req.body.password != req.body.confirm_password){
            req.flash('error', 'Confirm Password doesn\'t match');
            return res.redirect('back');
        }

        //If password matches with confirm password, then find email to preceed with actions
        let user = await User.findOne({email: req.body.email});

        //If Entered email user is not available in User Model then create that user and redirect to sign-in page
        if(!user){
            await User.create(req.body);
            req.flash('success', 'Your account created! Please Sign In!');
            return res.redirect('/users/sign-in');
        }

        //If entered email user is already exists then redirect to previous page
        else{
            req.flash('error', 'User already exists');
            return res.redirect('back');
        }
        
    } catch(err) {
        req.flash('error', err);
        return res.redirect('back');
    }
}



//sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success', "You've logged in successfully");
    return res.redirect('/');
}


//Destroy the created user's session from browser and sign out
module.exports.destroySession = function(req, res){

    req.logout();
    req.flash('success', "You've logged out successfully");
    return res.redirect('/');
}