const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');

//An Action for the Codeial Home Page
module.exports.home = function(req, res){

    //console.log(req.cookies);   //Print the browser cookie on console

    // res.cookie('user_id', 25);  //Alter the browser cookie from constoller

    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err, posts){
        if(err){ console.log('Error in fetching the posts'); }

            User.find({}, function(err, users){

                if(err){ console.log('Error in fetching the users'); }
                
                return res.render('home', {
                    title: 'Codeial',
                    posts: posts,
                    all_users: users    
            });
        });
    });
}