'use strict'

const express = require('express');
const api = express.Router();
const clinteController = require('./cliente.controller');



api.post('/register', clinteController.register);
api.put('/update/:id', clinteController.update);
api.delete('/delete/:id', clinteController.delete);



module.exports = api;