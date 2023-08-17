const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth_controller');

router.get('/signup', authController.signUpPage);
router.post('/signup', authController.signUp);

router.get('/login', authController.logInPage);
router.post('/login', authController.logIn);

router.get('/signOut', authController.signOut);
module.exports = router;