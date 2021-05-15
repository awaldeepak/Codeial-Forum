const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.addComment = function(req, res){

    Post.findById(req.body.post, function(err, post){

        if(err){
            console.log('Error in fetching the post');
            return;
        } 

        if(post){

            Comment.create({
                content: req.body.comment_content,
                user: req.user._id,
                post: req.body.post
            }, function(err, comment){
                
                if(err){
                    console.log('Error in creating the comment');
                    return;
                } 

                post.comments.push(comment);
                post.save();
                res.redirect('/');
            });
        }
    });
}