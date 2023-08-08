module.exports.profilePage = function(req, res){
    return res.render('user', {
        title: "User Page",
        user: "HRx"
    })
    return res.end('<h1>User Profile</h1>');
}