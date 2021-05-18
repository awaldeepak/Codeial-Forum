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

module.exports.destroyComment = function(req, res){
    
    Comment.findById(req.params.id)
    .populate('post')
    .populate({
        path: 'post',
        populate: 'user'
    })
    .exec( function(err, comment)
    {

        if((comment.user._id == req.user.id) || (comment.post.user.id == req.user.id)){

            let postId = comment.post;
            comment.remove();

            Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}}, function(err, post){

                return res.redirect('back');
            });
        } else {

            return res.redirect('back');
        }
    });
}