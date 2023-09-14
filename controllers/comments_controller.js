const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function (req, res) {
    try {
        const postId = await Post.findById(req.body.postID);

        if (!postId) {
            console.log('Post not found');
            return res.status(401).send({ message: 'Post not found' });
        }

        const comment = await Comment.create({
            content: req.body.content,
            post: req.body.postID,
            user: req.user._id,
        });

        postId.comments.push(comment);
        await postId.save();

        if(req.xhr){
            // Populate the user field and save the comment
            await comment.populate('user', 'name');
            await comment.save();

            return res.status(200).json({
                data: {
                    comment: comment,
                },
                message: "Comment added"
            })
        }

        console.log('Comment added');
        req.flash('success', 'Comment added');
        return res.redirect('/');
    } catch (error) {
        console.error('Error adding comment to the post:', error.message);
        return res.status(500).send({ message: 'Internal server error' });
    }
};

module.exports.destroy = async function (req, res) {
    try {
        const comment = await Comment.findById(req.params.id);
        
        

        if (!comment) {
            console.log('Comment not found');
            return res.status(404).send({ message: 'Comment not found' });
        }

        if (comment.user != req.user.id) {
            console.log('User is not authorized to delete this comment');
            return res.status(403).send({ message: 'Forbidden' });
        }

        const postId = comment.post;
        await Comment.deleteOne({ _id: req.params.id });

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { $pull: { comments: req.params.id } },
            { new: true }
        );

        if (!updatedPost) {
            console.log('Post not found after deleting the comment');
            return res.status(500).send({ message: 'Internal server error' });
        }

        if(req.xhr){
            return res.status(200).json({
                data: {
                    comment: comment,
                    comment_id: req.params.id
                },
                message: "Comment deleted"
            })
        }

        console.log('Comment deleted');
        req.flash('success', 'Comment deleted');
        return res.redirect('back');
    } catch (error) {
        console.error('Error in deleting comment:', error.message);
        return res.status(500).send({ message: 'Internal server error' });
    }
};
