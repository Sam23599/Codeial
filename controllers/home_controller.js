module.exports.home = function(req, res){
    return res.render('home', {
        title: "CodeBook"
    });
    // return res.end('<h1>Express is up</h1>')
}