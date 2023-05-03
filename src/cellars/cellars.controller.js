'use strict'

const Cellars = require('./cellars.model')
const Arrendamiento = require('../arrendamiento/arrendamiento.model')
const {validateData} = require('../utils/validate')

exports.test = (req, res)=>{
    res.send({message: 'Test function is running'});
}

exports.add = async(req, res)=>{
    try {
        let data = req.body;
        //validar duplicados
        let existCellars = await Cellars.findOne({ name: data.name });
        if (existCellars) return res.status(404).send({ message: 'Bodega existente' })
        //Estado predefenido
         data.status = 'AVAILABLE';
        //Guardar
        let cellars = new Cellars(data);
        await cellars.save();
        return res.send({message: 'winery created', cellars})
        
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error adding warehouse'})
    }

}

exports.getCellars = async(req, res) =>{
    try {
        let cellars = await Cellars.find();
        return res.send({message: 'Cellars found', cellars})
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

exports.searchStatus = async (req, res) => {
    try {
        let params = {
            status: req.body.status,
        }
        let validate = validateData(params)
        if (validate) return res.status(400).send(validate);
        let cellars = await Cellars.find({
            name: {
                $regex: params.name,
                $options: 'i'
            },
            status: 'AVAILABLE'
        })
        return res.send({ cellars })
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'No se encuentra bodega' })
    }
}

exports.searchNotAvailable = async (req, res) => {
    try {
        let params = {
            name: req.body.name,
        }
        let validate = validateData(params)
        if (validate) return res.status(400).send(validate);
        let cellars = await Cellars.find({
            name: {
                $regex: params.name,
                $options: 'i'
            },
            status: 'NOAVAILABLE'
        })
        return res.send({ cellars })
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'No se encuentra bodega' })
    }
}

exports.updateCellar = async(req, res)=>{
    try {
        //Capturar la data 
        let data = req.body;
        //capturar el id de la bodega
        let cellarId = req.params.id;
        if(data.location || data.status)return res.status(400).send({message: 'Some params are not acepted'})
        let updateBodega = await Cellars.findByIdAndUpdate(
         {_id: cellarId },  
          data, 
        { new: true }
        )
        if(!updateBodega) return res.send({message: 'No se encontro bodega '})
        return res.send({message: 'Cellar updated sucessfully', updateBodega })
    } catch (err) {
        console.error(err);
        return res.status(500).send({message: 'Error update cellar'})
    }
}

exports.delete = async(req, res)=>{
    try{
        //Obtener el id a eliminar
        let cellarsId = req.params.id;
        //Validar si esta arrendada por un usuario
        let arrendamientoExist = await Arrendamiento.findOne({cellars: cellarsId});
        if(arrendamientoExist) {
            return res.status(400).send({message: 'La bodega está siendo utilizada'});
        }
        //Eliminar
        let cellarDeleted = await Cellars.findOneAndDelete({_id: cellarsId});
        if(!cellarDeleted) return res.send({message: 'Cellar not found and not deleted'});
        return res.send({message: `Cellar  ${cellarDeleted.name} deleted sucessfully`});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error not deleted'});
    }
}