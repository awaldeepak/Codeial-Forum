const Post = require('../../../models/post');
const Comment  = require('../../../models/comment');


module.exports.index = async function(req, res){

    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    });

    return res.json(200, {
        message: "List of Posts",
        posts: posts
    });
}


module.exports.destroyPost = async function(req, res){

    try{
        let post = await Post.findById(req.params.id);

        // if(post.user == req.user.id){
            post.remove();
            await Comment.deleteMany({post: req.params.id});

            // req.flash('success', 'Post and linked comments deleted');
            // return res.redirect('back');
            return res.json(200, {
                message: "Post and associated comments deleted!"
            });

        // } else {
        //     req.flash('error', 'You cannot this post');
        //     return res.redirect('back');
        // }

    } catch(err) {
        // req.flash('error', err);
        // return res.redirect('back');
        console.log('******', err);
        return res.json(401, {
            message: "Internal Server Error"
        });
    }
}