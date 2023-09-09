const User = require('../models/user');

module.exports.profilePage = async function (req, res) {
    try {
        // const user = await User.findOne({ _id: req.user });
        const profile_user = await User.findById(req.params.id);
        if (profile_user) {
            return res.render('user', {
                title: "User Page",
                profile_user: profile_user
            });
        }
        else {
            console.log('Error in loading profile page');
            return res.redirect('/auth/login');
        }

    } catch (error) {
        console.log("Error in validating user session:", error);
        return;
    }
}

module.exports.update = async function(req, res){
    if(req.user.id==req.params.id){
        try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body);
            return res.redirect('back');
        } catch (error) {
            console.log('error updating user in user_controller: update');
            return res.redirect('back');
        }        
    }
    else{
        return res.status(401).send('Unauthorised');
    }
}