const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const Avatar_Path = path.join('/uploads/users/avatars');


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
    avatar: {
        type : String,
    }
}, {
    timestamps: true
});

let storage = multer.diskStorage({
    destination: (req , file , cb) =>  {
        cb(null, path.join(__dirname, '..', Avatar_Path));
    },
    filename : (req, file, cb)=>{
        cb(null, file.fieldname+ '-' + Date.now());
    }
});

// static methods
userSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar');
userSchema.statics.avatarPath = Avatar_Path;

const User = mongoose.model ('User', userSchema);
module.exports = User;