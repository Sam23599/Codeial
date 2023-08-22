const User = require('../models/user');

module.exports.profilePage = async function (req, res) {
    try {
        const user = await User.findOne({ _id: req.user });
        if (user) {
            return res.render('user', {
                title: "User Page",
                user: user
            });
        }
        console.log('Error in loading profile page');
        return res.redirect('/auth/login');
    } catch (error) {
        console.log("Error in validating user session:", error);
        return;
    }
}

