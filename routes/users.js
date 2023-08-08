const express = require('express');
const router = express.Router();

const userController = require("../controllers/users_controllers");
router.get('/profile', userController.profilePage);

const postController = require("../controllers/post_controller");
router.get('/post', postController.post);


module.exports = router;