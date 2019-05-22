const mongoose = require('mongoose');


const ProfileSchema = mongoose.Schema({
    _id: {type:Number,required:true},
    nom: String,
    email: String,
    password:{ type: String, required: true, bcrypt: true },
    photo_profile :String,
    
}, {
    timestamps: true
});

module.exports = mongoose.model('profil',ProfileSchema);