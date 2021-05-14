const express = require('express');
const router = express.Router();    //To call the Router() method in Express framework

const postsController = require('../controllers/posts_controller');

router.post('/create-post', postsController.createPost);


module.exports = router;