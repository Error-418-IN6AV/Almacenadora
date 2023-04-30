'use strict'

const Cliente = require('./cliente.model')
const Arrendamiento = require('../arrendamiento/arrendamiento.model')

exports.test = (req, res)=>{
    res.send({message: 'Test function is running'});
}

exports.register = async(req, res)=>{
    try{
        let data = req.body;
        //Validar que no existan duplicados 
        let existCli = await Cliente.findOne({username: data.username})
        if(existCli)return res.status(404).send({ message: 'Ya existe cliente con el nombre de usuario'})
        let client = new Cliente(data);
        await client.save();
        return res.send({message: 'Client created sucessfully'});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error creating Client', error: err.message})
    }
}

exports.getClients = async(req, res)=>{
    try {
        let clienta = await Cliente.find();
        return res.send({clienta})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error getting clientes'})
    }
}

exports.update = async(req, res)=>{
    try{
  
        let clientId = req.params.id;
        let data = req.body;
        let clientUpdated = await Cliente.findOneAndUpdate(
            {_id: clientId},
            data,
            {new: true} 
        )
        if(!clientUpdated) return res.status(404).send({message: 'Cliente not found and not updated'});
        return res.send({message: 'Cliente updated', clientUpdated})
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error not updated', err: `Username ${err.keyValue.username} is already taken`});
    }
}

exports.delete = async(req, res)=>{
    try{
        //Obtener el id a eliminar
        let clientId = req.params.id;
        //Validar si esta arrendado no eliminar
        let arrendamientoExist = await Arrendamiento.findOne({client: clientId});
        if(arrendamientoExist) {
            return res.status(400).send({message: 'El cliente esta arrendado'});
        }
        //Eliminar
        let clientDeleted = await Cliente.findOneAndDelete({_id: clientId});
        if(!clientDeleted) return res.send({message: 'Account not found and not deleted'});
        return res.send({message: `Account with username ${clientDeleted.username} deleted sucessfully`});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error not deleted'});
    }
}