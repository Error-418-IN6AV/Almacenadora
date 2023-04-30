'use strict'

const express = require('express');
const api = express.Router();
const arrendamientoController = require('./arrendamiento.controller');
const { ensureAuth, isAdmin } = require('../services/authenticated');

//Ruta de testeo
//Rutas públicas
api.post('/add', [ensureAuth, isAdmin], arrendamientoController.add);
api.get('/get', [ensureAuth], arrendamientoController.getArrendamientosByBodegasArrendadas);
api.put('/update/:id', [ensureAuth, isAdmin], arrendamientoController.updateArrendamiento);
api.delete('/delete/:id',[ensureAuth, isAdmin], arrendamientoController.deleteArrendamiento);
module.exports = api;