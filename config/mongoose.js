//Import the mongoose library to use it
const mongoose = require('mongoose');

//Connect to the development mode of Codeial DB
mongoose.connect('mongodb://localhost/codeial_development');

//Create a mongoose conncetion object to check conncetion establishment
const db = mongoose.connection;

//If an error in DB conncetion
db.on('error', console.error.bind(console, 'Error in connecting to DB'));

//If DB Conncetion is established
db.once('open', function(){
    console.log('DB conncetion established successfully');
});


//Export the mongoose conncetion object
module.exports = db;