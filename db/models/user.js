module.exports = (mongoose, connection) => 
    connection.model('User', new mongoose.Schema({
    userName : { 
        type : String,
        required: true
    },
    password : { 
        type : String, 
        required: true 
    },
    email : { 
        type: String,
        required: true 
    }
    }))



  
/*
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create user schema & model
const UserSchema = new Schema({
    login: {
        type: String,
        required: [true, 'Login field is required']
    },
    password: {
        type: String,

    }
})

const User = mongoose.model('user', UserSchema)

module.exports = User;
*/