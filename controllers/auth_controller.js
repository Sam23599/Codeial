const User = require('../models/user');

module.exports.signUpPage = function (req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('sign_up', {
        title: 'Signup Page'
    });
}

module.exports.signUp = async function (req, res) {
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.redirect('/auth/login');
};


module.exports.logInPage = function (req, res) {
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('log_in',{
        title: 'Login Page'
    });
}

module.exports.logIn = async function (req, res) {
    // return res.redirect('/')
    return res.redirect('/users/profile');

}

module.exports.signOut = function(req, res) {
    req.logout(function(err) {
        if (err) {
            console.log('Logout error:', err);
        }
    });

    return res.redirect('/');

}
