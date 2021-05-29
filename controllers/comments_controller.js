const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.addComment = async function(req, res){

    try{
        let post = await Post.findById(req.body.post);

        if(post){

            let comment = await Comment.create({
                content: req.body.comment_content,
                user: req.user._id,
                post: req.body.post
            });

            post.comments.push(comment);
            post.save();
            res.redirect('/');
        }
    } catch(err) {
        console.log("Error: ", err);
        return;
    }
}

module.exports.destroyComment = async function(req, res){
    
    try{
        let comment = await Comment.findById(req.params.id)
        .populate('post')
        .populate({
            path: 'post',
            populate: 'user'
        });

        if((comment.user._id == req.user.id) || (comment.post.user.id == req.user.id)){

            let postId = comment.post;
            comment.remove();

            await Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}});

            return res.redirect('back');

        } else {
            return res.redirect('back');
        }
    } catch(err) {
        console.log("Error: ", err);
        return;
    }
}