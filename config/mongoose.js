const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/codeial_developement');

const db = mongoose.connection;

db.on('error', console.log.bind(console, 'Error in database connection'));

db.once('open', ()=> {
    console.log('MongoDb connected');
})

module.exports = db;