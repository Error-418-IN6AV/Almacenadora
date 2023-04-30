'use strict'

require('dotenv').config()
const mongoConfig = require('./configs/mongo');
const app = require('./configs/app');
const userController = require('./src/User/user.controller')

mongoConfig.connect();
app.initServer();
userController.userAdmin();