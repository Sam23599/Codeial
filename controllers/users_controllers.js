const User = require('../models/user');
const fs = require('fs');
const path = require('path');

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
            // used when we updating just the text fields. now for updating profile pic, we used multer nd hence need to remove it
            // const user = await User.findByIdAndUpdate(req.params.id, req.body);

            const user =  await User.findById(req.params.id);
            
            console.log('1', req.body);
            // Handle avatar upload
            await new Promise((resolve, reject) => {
                User.uploadedAvatar(req, res, (err) => {
                    if (err) {
                        console.log("Multer error", err);
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });

            console.log('2', req.body);

            user.name = req.body.name;
            user.email = req.body.email;

            if (req.file) {
                if (user.avatar) {
                    fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                }
                
                // saving path of uploaded file into avatar field of user
                user.avatar = User.avatarPath + '/' + req.file.filename;
            }

            // Save the user object
            await user.save();

            req.flash('success', 'Profile Updated Successfully');
            return res.redirect('back');
        } catch (error) {
            req.flash('error in update', error);
            console.log('error updating user in user_controller: update');
            return res.redirect('back');
        }        
    }
    else{
        req.flash('error', 'Unauthorized');
        return res.status(401).send('Unauthorised');
    }
}

