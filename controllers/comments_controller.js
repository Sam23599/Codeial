const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req, res){
    try {
        const postId = await Post.findById(req.body.postID);
        if(postId){
            const comment = await Comment.create({
                content: req.body.content,
                post: req.body.postID,
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

module.exports.destroy = async function(req, res){
    try {
        const comment = await Comment.findById(req.params.id);
        if(comment.user == req.user.id){
            let postId = comment.post;
            await Comment.deleteOne({_id: req.params.id});
            
            await Post.findByIdAndUpdate(
                postId, 
                {$pull: {comments: req.params.id}},
                {new: true},
            );
            console.log('Comment Deleted');
            return res.redirect('back');

        } else{
            return res.redirect('back');
        }
    } catch(error) {
        console.log('Error in deleting comment in comment controller: destroy');
        return res.redirect('back');
    }
}
