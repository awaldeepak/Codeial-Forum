const express = require('express');
const router = express.Router();    //To call the Router() method in Express framework
const passport = require('passport');

const commentsController = require('../controllers/comments_controller');

router.post('/add-comment', passport.checkAuthentication, commentsController.addComment);


module.exports = router;