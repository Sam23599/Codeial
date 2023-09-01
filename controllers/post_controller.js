const Post = require('../models/post');

module.exports.create_post = async function (req, res) {
    console.log(req.user);
    try {
        await Post.create({
            content : req.body.content,
            user : req.user._id 
        });
        return res.redirect('back');

    } catch (error) {
        console.log('error in creating a post');
        return;
    }
}