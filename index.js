const express = require('express');
const app = express();
const port = 5000;  // generally it's 80

// use express router
app.use('/', require('./routes/index'));





app.listen(port, function(err){
    if(err){
        // console.log('error', err);
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});