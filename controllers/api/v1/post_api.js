const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function(req, res){
    
    const posts = await Post.find({})
            .sort('-createdAt')
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            });
    
    
    return res.status(200).json({
        message: "List of posts",
        posts: posts
    })
}


module.exports.destroy = async function(req, res){
    try {
        const post = await Post.findById(req.params.id);

        // if (!post) {
        //     console.log('Post not found');
        //     req.flash('error', 'Post does not exists')
        //     return res.redirect('back');
        // }
        
        // if (!post.user.equals(req.user._id)) {
        //     console.log('User is not authorized to delete this post');
        //     req.flash('error', 'You cannot delete this post!');
        //     return res.redirect('back');
        // }

        await Promise.all([
            Post.deleteOne({ _id: req.params.id }),
            Comment.deleteMany({ post: req.params.id }),
        ]);

        // if(req.xhr){
        //     return res.status(200).json({
        //         data:{
        //             post: post,
        //             post_id: req.params.id
        //         },
        //         message: "Post deleted"
        //     })
        // }        

        return res.status(200).json({
            message:"Post and Comments deleted successfully"
        })
    } catch(error) {
        
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}