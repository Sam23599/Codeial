const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require("../controllers/users_controllers");
router.get('/profile/:id', passport.checkAuthentication , userController.profilePage);
router.post('/update/:id', passport.checkAuthentication , userController.update);

const postController = require("../controllers/post_controller");
router.post('/create-post', postController.create_post);
router.get('/destroy/:id', passport.checkAuthentication, postController.destroy);


module.exports = router;