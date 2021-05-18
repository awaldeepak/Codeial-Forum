const express = require('express');
const router = express.Router();    //To call the Router() method in Express framework
const passport = require('passport');

const usersController = require('../controllers/users_controller');     //To import and initialize the actions in users_controller to use
const postsController = require('../controllers/posts_controller');     //To import and initialize the actions in posts_controller to use


//Call the respective actions using the respective methods from views
// router.get('/profile', passport.checkAuthentication, usersController.profile);
router.get('/profile/:id', passport.checkAuthentication, usersController.profile);
router.post('/update/:id', passport.checkAuthentication, usersController.update);
// router.get('/posts', postsController.posts);
router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);
router.post('/create', usersController.create);

//Use Passport as a Middleware to Authenticate
router.post('/create-session', 
    passport.authenticate(
        'local',
        {failureRedirect: '/users/sign-in'}
    ), 
    usersController.createSession);

router.get('/sign-out', usersController.destroySession);


module.exports = router;    //Export the router object
