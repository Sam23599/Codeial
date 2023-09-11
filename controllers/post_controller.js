const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create_post = async function (req, res) {
    console.log(req.user);
    try {
        await Post.create({
            content : req.body.content,
            user : req.user._id 
        });
        console.log('post created');
        req.flash('success', 'Posted Successfully')
        return res.redirect('back');

    } catch (error) {
        console.log('error in creating a post');
        req.flash('error', error);
        return;
    }
}

module.exports.destroy = async function(req, res){
    try {
        const post = await Post.findById(req.params.id);
        
        if (!post) {
            console.log('Post not found');
            req.flash('error', 'Post does not exists')
            return res.redirect('back');
        }
        
        if (!post.user.equals(req.user._id)) {
            console.log('User is not authorized to delete this post');
            req.flash('error', 'You cannot delete this post!');
            return res.redirect('back');
        }

        await Promise.all([
            Post.deleteOne({ _id: req.params.id }),
            Comment.deleteMany({ post: req.params.id }),
        ]);

        req.flash('success', 'Post deleted');
        return res.redirect('back');
    } catch(error) {
        console.log('error in deleting post', error.message);
        req.flash('error', error);
        return res.redirect('back');
    }
}
