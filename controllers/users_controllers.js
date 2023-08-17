const User = require('../models/user');

module.exports.profilePage = async function (req, res) {

    try {
        if (req.cookies.user_id) {
            const user = await User.findById(req.cookies.user_id);
    
            if (user) {
                return res.render('user', {
                    title: "User Page",
                    user: user
                })
            }
        }
        return res.redirect('/auth/login');
    
    } catch (error) {
        console.log('Error in validating user session', error);
        return;
    }




    return res.end('<h1>User Profile</h1>');
}