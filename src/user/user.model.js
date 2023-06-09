'use strict'

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }, 
    role: {
        type: String,
        required: true,
        uppercase: true
    }
});

module.exports = mongoose.model('User', userSchema);