const Post = require('../models/post');

module.exports.home = async function(req, res){
    try {
        const posts = await Post.find({}).populate('user').populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });
        return res.render('home', {
            title: 'CodeBook',
            posts: posts
        })
    } catch (error) {
        console.log("unknow error on showing posts on home page");
    }
    
    return res.render('home', {
        title: "CodeBook"
    });
}