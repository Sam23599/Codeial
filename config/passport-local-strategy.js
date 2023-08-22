const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

//authenticataion using passport
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async function (email, password, done) {
    // find user and establish strategy
    try {
        const userId = await User.findOne({email: email});
        if(!userId || userId.password != password){
            console.log('Invalid Username/Password');
            return done(null, false);
        }
        console.log('User Authenticated');
        return done(null, userId);

    } catch (error) {
        console.log('User not found/ Error in finding user: ', error);
        return done(error);
    }
}
));

// serailizing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
    done(null, user.id);
});


// deserializing the user from the key in the cookies
passport.deserializeUser(async function (id, done) {
    try {
        const userId = await User.findById(id);
        if (!userId){
            console.log('User not found --> Passport');
            return done(null, false);
        }
        console.log('User found');
        return done(null, userId);
    } catch(error) {
        console.log('Error in finding user --> Passport');
        return done(error);
    }
});

// check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    // if the user is signed in, then pass on the request to the next function (controller's function action not this file action)
    if(req.isAuthenticated()){
        console.log('Authenticated');
        return next();
    }
    // if not signed in
    console.log('User Not Authenticated/exists. Redirecting to Login');
    return res.redirect('/auth/login');
}

passport.setAuthenticatedUser =function(req, res, next){
    if(req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie
        // and we are just sending this to locals for the views
        console.log('Updating user for views');
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;