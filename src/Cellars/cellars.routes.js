'use strict'

const express = require('express')
const api = express.Router();
const cellarsController = require('./cellars.controller')

api.get('/test', cellarsController.test)
api.post('/addCellars', cellarsController.add)
api.get('/getCellars', cellarsController.getCellars)
api.get('/getCellar/:id', cellarsController.getStore)
api.put('/updateCellar/:id', cellarsController.updateCellar)
module.exports = api;