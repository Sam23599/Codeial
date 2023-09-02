const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req, res){
    try {
        const postId = await Post.findById(req.body.postID);
                
        if(postId){
            const comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            postId.comments.push(comment);
            await postId.save();
            return res.redirect('/');
        }
    } catch (error) {
        console.log("error adding comment to the post");
        return res.status(401).send({message: 'Post not found'});
    }
}