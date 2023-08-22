const express = require('express');
const router = express.Router();
const passport = require('passport');

const authController = require('../controllers/auth_controller');
const userController = require('../controllers/users_controllers');

router.get('/signup', authController.signUpPage);
router.post('/signup', authController.signUp);

router.get('/login', authController.logInPage);
// use passport as a middleware to authenticate
router.post('/login', passport.authenticate(
    'local',
    {failureRedirect: '/auth/login'},
) ,authController.logIn);

router.get('/signOut', authController.signOut);
module.exports = router;