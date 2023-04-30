'use strict'

const Cliente = require('./cliente.model')
const { validateData, encrypt, checkPassword } = require('../utils/validate');


exports.test = (req, res)=>{
    res.send({message: 'Test function is running'});
}

exports.register = async(req, res)=>{
    try{
        let data = req.body;
        let params = {
            password: data.password,
        }
        let validate = validateData(params);
        if(validate) return res.status(400).send(validate);  
         data.password = await encrypt(data.password)
        let client = new Cliente(data);
        await client.save();
        return res.send({message: 'Client created sucessfully'});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error creating Client', error: err.message})
    }
}


exports.update = async(req, res)=>{
    try{
  
        let clientId = req.params.id;
        let data = req.body;
       
       
        if(data.password || Object.entries(data).length === 0) return res.status(400).send({message: 'Have submitted some data that cannot be updated'});
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
        //Validar si tiene permisos
       
        //Eliminar
        let clientDeleted = await Cliente.findOneAndDelete({_id: clientId});
        if(!clientDeleted) return res.send({message: 'Account not found and not deleted'});
        return res.send({message: `Account with username ${clientDeleted.username} deleted sucessfully`});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error not deleted'});
    }
}