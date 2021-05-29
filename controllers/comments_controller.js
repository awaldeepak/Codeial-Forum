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
            req.flash('success', 'Comment Posted');
            res.redirect('/');
        }
    } catch(err) {
        req.flash('error', err);
        res.redirect('back');;
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

            req.flash('success', 'Comment Deleted');
            return res.redirect('back');

        } else {
            req.flash('error', 'You cannot delete this comment');
            return res.redirect('back');
        }
    } catch(err) {
        req.flash('error', err);
        return res.redirect('back');
    }
}