const express = require('express');
const app = express();
const port = 5000;  // generally it's 80
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');

// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const flashMiddleware = require('./config/flash_middleware');


app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));


const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static('./assets'));

// setup the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeial',
    // ToDo: change the secret before deployment in prodcution mode
    secret: 'frozenLand',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 *60)            // in seconds
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/codeial_developement',
        mongooseConnection: db,
        autoRemove: 'interval',
        autoRemoveInterval: 60 * 1,     // in mins
        touchAfter: 1800                //in seconds
    },
        function (err) {
            console.log(err || 'connect-mongodb setup ok');;
        })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// extract style nd script from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(flash());
app.use(flashMiddleware.setFlash);

// make upload path availabe for the browser
app.use('/uploads', express.static(__dirname + '/uploads'));
// use express router
app.use('/', require('./routes/index'));



app.listen(port, function (err) {
    if (err) {
        // console.log('error', err);
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});
