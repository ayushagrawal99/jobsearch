const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatar');
const candidateSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    }, 
    password : {
        type : String,
        required : true
    },
    usertype : {
        type : String,
    },
    avatar : [
        {
            type : String
        }
    ]
},{
    timestamps : true
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..',AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    }
  });

// static methods
candidateSchema.statics.uploadedAvatar = multer({ storage: storage }).single('avatar');
candidateSchema.statics.avatarPath = AVATAR_PATH;

const Candidate = mongoose.model('Candidate', candidateSchema);
module.exports = Candidate;