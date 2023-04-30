'use strict'

const express = require('express');
const api = express.Router();
const additionalservicesController = require('./additionalservices.controller');
const { ensureAuth, isAdmin } = require('../services/authenticated');

api.get('/test', [ensureAuth, isAdmin], additionalservicesController.test)
api.get('/get', [ensureAuth], additionalservicesController.getServices)
api.post('/add', [ ensureAuth, isAdmin ], additionalservicesController.add)
api.put('/update/:id', [ ensureAuth, isAdmin ], additionalservicesController.update)

module.exports = api;

