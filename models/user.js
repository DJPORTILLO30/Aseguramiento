const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: Number,  
    username: {
        type: String,
        required: true,
        unique: true  
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    }
});


const User = mongoose.model('User', userSchema);

module.exports = User;
