'use strict'

const Cellars = require('./cellars.model')

exports.test = (req, res)=>{
    res.send({message: 'Test function is running'});
}

exports.add = async(req, res)=>{
    try {
        let data = req.body;
        //Estado predefenido
         data.status = 'AVAILABLE';
        //Guardar
        let cellars = new Cellars(data);
        await cellars.save();
        return res.send({message: 'winery created'})
        
        
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error adding warehouse'})
    }

}

exports.getCellars = async(req, res) =>{
    try {
        let cellars = await Cellars.find();
        return res.send({message: 'Categories found', cellars})
    } catch (err) {
        console.log(err)
        return res.status(500).send({message: 'Error when showing the warehouses'})
    }
}

exports.getStore = async(req, res)=>{
    try {
        let storeId = req.params.id;
        let cellar = await Cellars.findOne({_id: storeId});
        if(!cellar) res.status(404).send({message: 'Cellar not found'})
        return res.send({message: 'cellar found', cellar})
        
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error when obtaining warehouse'})
    }
}

exports.updateCellar = async(req, res)=>{
    try {
        //Capturar la data 
        let data = req.body;
        //capturar el id de la bodega
        let cellarId = req.params.id;
        if(data.location || data.status)return res.status(400).send({message: 'Some params are not acepted'})
        let existCellar = await Cellars.findByIdAndUpdate(
         {_id: cellarId },  
          data, 
        { new: true }
        )
        if(!existCellar) return res.send({message: 'No se encontro bodega '})
        return res.send({message: 'Cellar updated sucessfully', existCellar })
    } catch (err) {
        console.error(err);
        return res.status(500).send({message: 'Error update cellar'})
    }
}