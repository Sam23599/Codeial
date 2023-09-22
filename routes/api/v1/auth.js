const express = require('express');
const router = express.Router();
const authApi = require('../../../controllers/api/v1/auth_api');


router.post('/login', authApi.logIn);


module.exports = router;
