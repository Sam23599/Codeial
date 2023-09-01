const Post = require('../models/post');

module.exports.home = async function(req, res){
    try {
        const posts = await Post.find({}).populate('user');
        return res.render('home', {
            title: 'CodeBook',
            posts: posts
        })
    } catch (error) {
        console.log("unknow err on showing posts on home page");
    }
    
    return res.render('home', {
        title: "CodeBook"
    });
    // return res.end('<h1>Express is up</h1>')
}