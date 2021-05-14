const express = require('express');

const router = express.Router();        //Call and initialize the Router() method from express
const homeController = require('../controllers/home_controller');   //To import and initialize the actions in home_controller


//Print message on console to confirm the router has loaded
console.log('Router loaded');

//call the respective actions using the methods in views
router.get('/', homeController.home);   
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));


module.exports = router;    //Export the router object