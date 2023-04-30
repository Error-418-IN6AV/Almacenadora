'use strict'

const User = require('./user.model');
const { validateData, encrypt, checkPassword } = require('../utils/validate');
const { createToken } = require('../services/jwt');


exports.test = (req, res)=>{
    res.send({message: 'Test function is running'});
}

exports.userAdmin = async () => {
    try {
        let data = {
            name: 'jose',
            surname: 'cifuentes',
            username: 'admin',
            password: 'admin',
            role: 'ADMIN'
        }
        data.password = await encrypt(data.password)
        let existAdmin = await User.findOne({ name: 'jose' });
        if (existAdmin) return console.log('Default admin already createad');
        let admin = new User(data);
        await admin.save();
        return console.log('Default admin created');
    } catch (err) {
        return console.error(err);
    }
}

exports.register = async(req, res)=>{
    try{
        let data = req.body;
        let params = {
            password: data.password,
        }
        let validate = validateData(params);
        if(validate) return res.status(400).send(validate);
        data.role = 'CLIENT';
        data.password = await encrypt(data.password)
        let user = new User(data);
        await user.save();
        return res.send({message: 'Account created sucessfully'});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error creating account', error: err.message})
    }
}

exports.save = async(req, res)=>{
    try{
        let data = req.body;
        let params = {
            password: data.password,
        }
        let validate = validateData(params);
        if(validate) return res.status(400).send(validate);
        data.password = await encrypt(data.password);
        let user = new User(data);
        await user.save();
        return res.send({message: 'Account created sucessfully'});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error saving user', error: err.message});
    }
}

exports.login = async(req, res)=>{
    try{
        let data = req.body;
        let credentials = { 
            username: data.username,
            password: data.password
        }
        let msg = validateData(credentials);
        if(msg) return res.status(400).send(msg)
        let user = await User.findOne({username: data.username});
        if(user && await checkPassword(data.password, user.password)) {
            let token = await createToken(user)
            return res.send({message: 'User logged sucessfully', token});
        }
        return res.status(401).send({message: 'Invalid credentials'});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error, not logged'});
    }
}

exports.update = async(req, res)=>{
    try{
        let userId = req.params.id;
        let data = req.body;
        if(userId != req.user.sub) return res.status(401).send({message: 'Dont have permission to do this action'});
        if(data.password || Object.entries(data).length === 0 || data.role) return res.status(400).send({message: 'Have submitted some data that cannot be updated'});
        let userUpdated = await User.findOneAndUpdate(
            {_id: req.user.sub},
            data,
            {new: true} 
        )
        if(!userUpdated) return res.status(404).send({message: 'User not found adn not updated'});
        return res.send({message: 'User updated', userUpdated})
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error not updated', err: `Username ${err.keyValue.username} is already taken`});
    }
}

exports.deleteUser = async(req, res) => {
    try {
        const userId = req.params.id;
        const userHasLease = await Lease.exists({user: userId});
        if(userHasLease) {
            return res.status(400).send({message: 'No se puede eliminar el usuario porque está arrendando una bodega.'});
        }
        const deletedUser = await User.findByIdAndDelete(userId);
        if(!deletedUser) {
            return res.status(404).send({message: 'Usuario no encontrado.'});
        }
        return res.send({message: 'Usuario eliminado correctamente.'});
    } catch(error) {
        console.error(error);
        return res.status(500).send({message: 'Error al eliminar el usuario.'});
    }
}