const User = require('../models/user');

module.exports.signUpPage = function (req, res){
    return res.render('sign_up', {
        title: 'Signup Page'
    });
}

module.exports.signUp = async function (req, res) {
    return res.redirect('/auth/login');

};


module.exports.logInPage = function (req, res) {
    return res.render('log_in',{
        title: 'Login Page'
    });
}

module.exports.logIn = async function (req, res) {
    
    
    return res.redirect('/users/profile');

}

module.exports.signOut = function(req, res){
    return res.redirect('/auth/login');
}