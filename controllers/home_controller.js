//An Action for the Codeial Home Page
module.exports.home = function(req, res){

    console.log(req.cookies);   //Print the browser cookie on console

    res.cookie('user_id', 25);  //Alter the browser cookie from constoller

    return res.render('home', {
        'title': 'Codeial'
    });
}
