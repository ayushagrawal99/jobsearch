const express = require('express');
const port = 5000;
const app = express();
const sassMiddleware = require('node-sass-middleware');
const db = require('./config/mongoose');
const expressLayout = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');

const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const mongoStore = require('connect-mongo')(session);

app.use('/uploads', express.static(__dirname + '/uploads'))

app.set('view engine','ejs');
app.set('views', './views');

app.use(sassMiddleware({
    src : './assets/scss',
    dest : './assets/css',
    debug : true,
    outputStyle : 'extended',
    prefix : '/css'
}));

app.use(express.urlencoded());
app.use(cookieParser());

app.use(session({
    name : 'jobsearch',
    secret: 'job search profile',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        maxAge : (1000*60*100)
    },
    store : new mongoStore({
        mongooseConnection : db,
        autoRemove : 'disabled'
    },
    function(err){
        console.log(err || "connect mongoDB setup");
    })
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('./assets'));

app.use(expressLayout);

app.set('layout extractStyles',true);
app.set('layout extractScripts',true)

app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes/index'));

app.listen(port, function(err){
    if(err){ console.log("error in express",port); return;}
    console.log("express run at port ",port);
});