const mongoose = require("mongoose");               //import the mongoose library

//Create Schema for the user collection
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
}, {timestamps: true});

//Initializing the userSchema to create a collection/model from it.
const User = mongoose.model('User', userSchema);

//Export the User Model
module.exports = User;  