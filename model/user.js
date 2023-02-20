// a user model that add the roles of a guest and an admin
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
    username:{
        type:String,
        required: true,
        lowercase: true

    },
    password:{
        type: String,
        required: true,
        lowercase: true
    }, 
    role:{
        type: String,
        required: true,
        enum: ['guest', 'admin'], default: 'guest'
    }

   
})

const User = mongoose.model('User', userSchema);
module.exports = User;