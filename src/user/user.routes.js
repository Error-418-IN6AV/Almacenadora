'use strict'

const express = require('express');
const api = express.Router();
const userController = require('./user.controller');
const { ensureAuth, isAdmin } = require('../services/authenticated');


api.post('/login', userController.login);
api.get('/get', [ensureAuth], userController.getUser )
api.put('/update/:id', [ensureAuth, isAdmin], userController.update);
api.delete('/delete/:id', [ensureAuth, isAdmin], userController.deleteUser);
api.get('/test', [ensureAuth, isAdmin], userController.test);
api.post('/save', [ ensureAuth, isAdmin ], userController.save);

module.exports = api;