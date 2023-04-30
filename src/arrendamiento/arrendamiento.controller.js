'use strict'

const Arrendamiento = require('./arrendamiento.model');
const Client = require('../cliente/cliente.model');
const Cellars = require('../cellars/cellars.model');
const AdditionalServices = require('../additionalservices/additionalservices.model');

exports.add = async(req, res)=>{
    try{
        //Capturar la data
        let data = req.body;
        //Verificar que existe la user
        let clientExist = await Client.findOne({_id: data.client})
        if(!clientExist) return res.send({message: 'El cliente no existe'})
        //Verificar que existe la bodega
        let bodegaExist = await Cellars.findOne({_id: data.cellars})
        if(!bodegaExist) return res.send({message: 'La bodega no existe'})
        if(bodegaExist.status === 'NOAVAILABLE') return res.send({message: 'La bodega no esta disponible'})
        //Verificar que existe la serviciosAdicionales
        let serviciosExist = await AdditionalServices.findOne({_id: data.additionalServices})
        if(!serviciosExist) return res.send({message: 'El servicio no existe'})  
        bodegaExist.status = 'NOAVAILABLE'
        await bodegaExist.save();
        let arrendamiento = new Arrendamiento(data);
        await arrendamiento.save();
        return res.send({message: 'Arrendamiento created sucessfully'});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error creating arrendamiento'});
    }
}

exports.getArrendamientosByBodegasArrendadas = async(req, res)=>{
    try{
        let bodegasNoDisponibles = await Cellars.find({status: 'NOAVAILABLE'});
        let bodegasIds = bodegasNoDisponibles.map(cellars => cellars._id);
        let arrendamientos = await Arrendamiento.find({cellars: {$in: bodegasIds}});
        return res.send({arrendamientos});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting arrendamientos'});
    }
}

exports.updateArrendamiento = async(req, res)=>{
    try{
        //capturar data
        let data = req.body;
        //obtener el id
        let arrendamientoId = req.params.id;
        //validar que no se pueda actualizar a una bodega ocupada
        let bodegaExist = await Cellars.findOne({_id: data.cellars});
        if (bodegaExist.status === 'NOAVAILABLE') {
            return res.send({message: 'Bodega ocupada'})
        }
        //obtener arrendamiento actual
        let arrendamientoActual = await Arrendamiento.findOne({_id: arrendamientoId})
        //actualizar bodega anterior
        let bodegaAnteior = await Cellars.findOne({_id: arrendamientoActual.cellars})
        bodegaAnteior.status = 'AVAILABLE'
        await bodegaAnteior.save()
        //Actualizar
        let updatedArrendamiento = await Arrendamiento.findOneAndUpdate(
            {_id: arrendamientoId},
            data,
            {new: true}
        )
        //actualizar bodega nueva
        bodegaExist.status = 'NOAVAILABLE'
        await bodegaExist.save();
        if(!updatedArrendamiento) return res.status(404).send({message: 'Arrendmiento not found and not updated'});
        return res.send({message: 'Arrendamiento updated', updatedArrendamiento});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error updating arrendamiento'});
    }
}

exports.deleteArrendamiento = async(req, res)=>{
    try{
        //obtener el id del arrendamiento a eliminar
        let idArrendamiento = req.params.id;
        let deletedArrendamiento = await Arrendamiento.findOneAndDelete({_id: idArrendamiento});
        if(!deletedArrendamiento) return res.status(404).send({message: 'Error removing arrendamiento or already deleted'});
        // Obtener la bodega correspondiente al arrendamiento eliminado
        let bodega = await Cellars.findById(deletedArrendamiento.cellars);
        if(!bodega) return res.status(404).send({message: 'Error finding bodega'});
        // Cambiar el nombre de la bodega a "DISPONIBLE"
        bodega.status = 'AVAILABLE';
        await bodega.save();
        return res.send({message: 'arrendamiento deleted sucessfully', deletedArrendamiento});
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error removing arrendamiento'})
    }
}