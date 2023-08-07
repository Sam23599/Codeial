const express = require('express');
const app = express();
const port = 5000;  // generally it's 80

app.listen(port, function(err){
    if(err){
        console.log('error', err);
        
    }
})