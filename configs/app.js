'use strict'

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const app = express();
//<<<<<<< HEAD
const port = process.env.PORT || 3500;
//<<<<<<< HEAD
//<<<<<<< HEAD
//<<<<<<< .merge_file_ojvsDd
//<<<<<<< HEAD
const additionalservicesRoutes = require('../src/additionalservices/additionalservices.routes');   
//=======
const cellarsRoutes = require('../src/cellars/cellars.routes')
//>>>>>>> ecucul-2021681
//=======
const arrendamiento = require('../src/arrendamiento/arrendamiento.routes')
//>>>>>>> jcifuentes-2018084
//=======
const userRoutes = require('../src/user/user.routes');
//>>>>>>> gpinzon-2021163
//=======
const clientRoutes = require('../src/cliente/cliente.routes')
//>>>>>>> carroyo-2021203

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
app.use(helmet());
//<<<<<<< HEAD
app.use(morgan('dev'));
//<<<<<<< HEAD
//<<<<<<< HEAD
//<<<<<<< HEAD
//>>>>>>>  avillanueva-2021436
app.use('/additionalSevices', additionalservicesRoutes);
//=======
app.use(morgan('dev')); 
app.use('/cellars', cellarsRoutes);
//>>>>>>> ecucul-2021681
//=======
app.use('/cliente',clientRoutes)
//>>>>>>> .merge_file_yE6OOe
//=======
app.use('/arrendamiento', arrendamiento)
//>>>>>>> jcifuentes-2018084
//=======
app.use('/user',userRoutes)

//>>>>>>> gpinzon-2021163
///=======
app.use('/cliente',clientRoutes)
//>>>>>>> carroyo-2021203

exports.initServer = ()=>{
    app.listen(port);
    console.log(`Server http running in port ${port}`);
} 