'use strict'

const mongoose = require('mongoose')

const cellarsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
        
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true,
        uppercase: true,
        default: 'AVAILABLE'
    },
    price: {
        type: Number,
        required: true
    }
},{
    versionKey: false
});

module.exports = mongoose.model('Cellars', cellarsSchema);