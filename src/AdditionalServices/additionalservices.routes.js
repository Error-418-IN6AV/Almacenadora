'use strict'

const express = require('express');
const api = express.Router();
const additionalservicesController = require('./additionalservices.controller');
const { ensureAuth, isAdmin } = require();

api.get('/test', additionalservicesController.test)
api.get('/get', additionalservicesController.getServices)
api.post('/add', additionalservicesController.add)
api.put('/update/:id', additionalservicesController.update)

module.exports = api;