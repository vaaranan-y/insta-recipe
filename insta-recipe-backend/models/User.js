const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
    type: String,
    required: true
    },
    password: {
    type: String,
    required: true
    },
    token: { 
    type: String,
    required: true
    },
    date: {
    type: Date,
    default: Date.now
    }
}, {collection: 'users'});

module.exports = User = mongoose.model('User', UserSchema);
