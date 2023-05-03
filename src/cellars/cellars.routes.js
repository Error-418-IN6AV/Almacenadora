'use strict'

const express = require('express')
const api = express.Router();
const cellarsController = require('./cellars.controller')
const { ensureAuth, isAdmin } = require('../services/authenticated');
api.get('/test', cellarsController.test)
api.post('/addCellars',  [ensureAuth, isAdmin],   cellarsController.add)
api.get('/getCellars',  [ensureAuth],  cellarsController.getCellars)
api.get('/getCellar/:id',   [ensureAuth, isAdmin], cellarsController.getStore)
api.post('/getAva', /* [ensureAuth,isAdmin], */ cellarsController.searchStatus)
api.post('/getInAva', /* [ensureAuth,isAdmin], */ cellarsController.searchNotAvailable)
api.put('/updateCellar/:id',  [ensureAuth, isAdmin],  cellarsController.updateCellar)
api.delete('/delete/:id',  [ensureAuth,isAdmin], cellarsController.delete)
module.exports = api;