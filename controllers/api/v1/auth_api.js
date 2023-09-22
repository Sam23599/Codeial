const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

module.exports.logIn = async function (req, res) {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user || req.body.password!= user.password) {
            return res.status(422).json({
                message: "Invalid Username or Password",
            });
        }

        return res.status(200).json({
            message: "Logged in successfully. Keep your token safe",
            data : {
                token : jwt.sign(user.toJSON(), 'dragonspine', {expiresIn: '100000'})
            }
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}