const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function (req, res) {
    try {
        const posts = await Post.find({})
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            });
            
        const users = await User.find({});
        return res.render('home', {
            title: 'CodeBook',
            posts: posts,
            all_users: users
        })

    } catch (error) {
        console.log("unknow error on showing posts on home page");
        return;
    }

}