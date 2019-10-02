module.exports = (mongoose, conn) => conn.model('User', new mongoose.Schema({
    login : { type : String, unique : true},
    password : { type : String}
}));
  
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