'use strict'

const express = require('express');
const api = express.Router();
const clinteController = require('./cliente.controller');
const { ensureAuth, isAdmin } = require('../services/authenticated');
api.get('/get', ensureAuth, clinteController.getClients )
api.post('/register', [ensureAuth] ,clinteController.register);
api.put('/update/:id', [ensureAuth], clinteController.update);
api.delete('/delete/:id', [ensureAuth], clinteController.delete);

module.exports = api;