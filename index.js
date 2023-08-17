const express = require('express');
const app = express();
const port = 5000;  // generally it's 80
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));


// setup the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


// extract style nd script from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// use express router
app.use('/', require('./routes/index'));



app.listen(port, function(err){
    if(err){
        // console.log('error', err);
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});
