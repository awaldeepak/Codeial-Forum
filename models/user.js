const mongoose = require("mongoose");               //import the mongoose library

const multer = require("multer");
const path = require("path");
const AVATAR_PATH = path.join("/uploads/users/avatars");


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
    },
    avatar:{
        type: String
    }
}, {timestamps: true});


let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "..", AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
});


userSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH;



//Initializing the userSchema to create a collection/model from it.
const User = mongoose.model('User', userSchema);

//Export the User Model
module.exports = User;  