const User = require('../models/user');

module.exports.signUpPage = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('sign_up', {
        title: 'Signup Page'
    });
}

module.exports.signUp = async function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    if (req.body.password != req.body.confirm_password) {
        console.log('Passwords not matched');
        return res.redirect('back');
    }

    try {
        const user = await User.findOne({ email: req.body.email });

        console.log('new account');

        if (!user) {
            console.log('Creating account');
            await User.create(req.body);
            return res.redirect('/auth/login');
        } else {
            console.log('Account already exists with the same email. Login instead');
            return res.redirect('back');

            // in-case if u want to show an alert to the frontend side
            // return res.send('<script>alert("Account already exists with the same email. Click on Login instead"); window.location.href = "/auth/login";</script>');
        }
    } catch (err) {
        console.log('Error in signing up:', err);
        return;
    }
};


module.exports.logInPage = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    console.log('redirecting to login page');
    return res.render('log_in', {
        title: 'Login Page'
    });
}

module.exports.logIn = async function (req, res) {
    console.log('Checking if user exists');
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        console.log('User does not exist. Signup instead');
        return res.redirect('back');
    }

    console.log('Authenticating password');
    const typedPassword = req.body.password;
    const databasePassword = user.password;

    // In-case if you want to use proper hashing technique for passwords using bcrypt library
    // const passwordMatch = await bcrypt.compare(typedPassword, user.password);

    if (typedPassword != databasePassword) {
        console.log('Passwords not matched');
        return res.redirect('back');
    }
    else {
        console.log('Logged in successfully');
        res.cookie('user_id', user._id); // Corrected way to set the cookie
        return res.redirect('/');
    }
}

module.exports.signOut = function (req, res) {
    console.log('Signing out');

    // clear logged cookie 'user_id'
    const cookies = req.cookies;
    Object.keys(cookies).forEach(cookieName => {
        res.clearCookie(cookieName, { path: '/' }); // Clear the cookie with the correct path
    });

    // clear session cookie 'codeial'
    req.session.cookie.expires = new Date();
    req.session.cookie.maxAge = 0; 

    req.logout(function (err) {
        if (err) {
            console.log('Logout error:', err);
        }
    });

    return res.redirect('/');
}
