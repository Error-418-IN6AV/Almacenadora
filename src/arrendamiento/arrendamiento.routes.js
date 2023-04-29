'use strict'

const express = require('express');
const api = express.Router();
const arrendamientoController = require('./arrendamiento.controller');
//const { ensureAuth, isAdmin } = require('../services/authenticated');

//Ruta de testeo
//Rutas públicas
api.post('/add', arrendamientoController.add);
api.get('/get', arrendamientoController.getArrendamientosByBodegasArrendadas);
api.put('/update/:id', arrendamientoController.updateArrendamiento);
api.delete('/delete/:id', arrendamientoController.deleteArrendamiento);
module.exports = api;