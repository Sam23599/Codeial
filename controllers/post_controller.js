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
        return res.redirect('back');

    } catch (error) {
        console.log('error in creating a post');
        return;
    }
}

module.exports.destroy = async function(req, res){
    try {
        const post = await Post.findById(req.params.id);
        if(post.user.equals(req.user._id)){
            await Post.deleteOne({ _id: req.params.id });
            try {
                await Comment.deleteMany({post: req.params.id});
                return res.redirect('back');
            } catch(error) {
                console.log('error in deleting post\'s comments');
                return res.redirect('back');         q
            }
        }
    } catch(error) {
        console.log('error in deleting post');
        return res.redirect('back');
    }
}
