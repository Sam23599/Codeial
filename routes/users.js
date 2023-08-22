const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require("../controllers/users_controllers");
router.get('/profile', passport.checkAuthentication , userController.profilePage);

const postController = require("../controllers/post_controller");
router.get('/post', postController.post);


module.exports = router;