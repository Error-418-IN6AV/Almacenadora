'use strict'

const express = require('express');
const api = express.Router();
const arrendamientoController = require('./arrendamiento.controller');
const { ensureAuth, isAdmin } = require('../services/authenticated');

//Ruta de testeo
//Rutas públicas
api.post('/add',  [ensureAuth],  arrendamientoController.add);
api.get('/get',   [ensureAuth],   arrendamientoController.getArrendamientos);
api.get('/get/:id',   [ensureAuth],  arrendamientoController.getArrendamientosById);
api.put('/update/:id',     [ensureAuth],     arrendamientoController.updateArrendamiento);
api.delete('/delete/:id',  [ensureAuth],   arrendamientoController.deleteArrendamiento);
module.exports = api;