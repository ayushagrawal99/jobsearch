const passport = require('../config/passport-local-strategy');

// open home page
module.exports.home = async function(req,res){
    try {
        if(req.user.usertype == 'candidate'){
            return res.render('candidate_home',{
                title : "HOME"
            });  
        } else if(req.user.usertype == 'employer'){
            return res.render('employer_home',{
                title : "HOME"
            });  
        }
    } catch (error) {
        console.log("error in home page",error);
        return;
    }
}

// sign-up the user
module.exports.CandidatesignUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/home');
    }
    return res.render('sign_up_candidate',{
        title : "SIGN UP || CANDIDATE"
    });
}

// sign-in the user
module.exports.CandidatesignIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/home');
    }
    return res.render('sign_in_candidate',{
        title : "SIGN IN || CANDIDATE"
    });
}

// sign out the user
module.exports.signOut = function(req,res){
    req.logout();
    return res.redirect('/');
}

