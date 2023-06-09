'use strict'

const mongoose = require('mongoose');

const additionalservicesSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
},
    {
        versionKey: false
    });

module.exports = mongoose.model('AdditionalServices', additionalservicesSchema);