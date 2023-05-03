'use strict'

const express = require('express');
const api = express.Router();
const clinteController = require('./cliente.controller');
const { ensureAuth, isAdmin } = require('../services/authenticated');
api.get('/get',  ensureAuth,  clinteController.getClients )
api.get('/getClient/:id',  ensureAuth,  clinteController.getClient )
api.post('/register', [ensureAuth, isAdmin] , clinteController.register);
api.put('/update/:id', [ensureAuth, isAdmin], clinteController.update);
api.delete('/delete/:id',  [ensureAuth, isAdmin],  clinteController.delete);

module.exports = api;