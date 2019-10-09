module.exports = (mongoose, connection) => 
    connection.model('RefreshToken', new mongoose.Schema({
        userId: String,
        token: String
    }))