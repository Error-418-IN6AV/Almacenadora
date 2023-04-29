'use strict'

const mongoose = require('mongoose');

const arrendamientoSchema = mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    cellars: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cellars',
        required: true
    },
    additionalServices:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AdditionalServices',
        required: true
    }
},    
    {
    versionKey: false
    });

module.exports = mongoose.model('Arrendamiento', arrendamientoSchema);