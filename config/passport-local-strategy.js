const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const Candidate = require('../models/candidate');

// we use passport local strategy
passport.use(new localStrategy({
    usernameField : 'email',             // this allow us to set req argument here
}, function(email,password,done){
    Candidate.findOne({email : email}, function(err,candidate){
        if(err){
            console.log("error in passport",err);
            return;
        }
        if(!candidate || candidate.password != password){
            return done(null,false);
        }
        return done(null,candidate);
    })
}))

// used to serialize the user for the store session cookies
passport.serializeUser(function(candidate, done) {
    done(null, candidate.id); 
});

// used to deserialize the user to find which user is there
passport.deserializeUser(function(id, done) {
    Candidate.findById(id, function(err, candidate) {
        if(err){
            console.log("error in deserialize the user",err);
            return done(err);
        }
        done(err, candidate);
    });
});

// check if user is authenticate
passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/');
}

// this middleware function is use for set user in locals i.e. front-end side
passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}


module.exports = passport;