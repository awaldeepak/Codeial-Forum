const express = require('express');

const router = express.Router();    //To call the Router() method in Express framework

const usersController = require('../controllers/users_controller');     //To import and initialize the actions in users_controller to use
const postsController = require('../controllers/posts_controller');     //To import and initialize the actions in posts_controller to use


//Call the respective actions using the respective methods from views
router.get('/profile', usersController.profile);
router.get('/posts', postsController.posts);
router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);
router.post('/create', usersController.create);
router.post('/create-session', usersController.createSession);
router.post('/delete-session', usersController.deleteSession);

module.exports = router;    //Export the router object
