'use strict'

const Service = require('./additionalservices.model');

exports.test = (req, res) => {
    res.send({ message: 'Función de prueba' });
}

exports.add = async (req, res) => {
    try {
        let data = req.body;
        let existService = await Service.findOne({ name: data.name });
        if (existService) return res.status(404).send({ message: 'Servicio existente' })
        let service = new Service(data);
        await service.save();
        return res.send({ message: 'Servicio creado con éxito', service });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error al crear cuenta' })
    }
}

exports.getServices = async (req, res) => {
    try {
        let services = await Service.find();
        return res.send({ message: 'Servicios encontrados', services });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error al obtener servicios' });
    }
}

exports.update = async (req, res) => {
    try {
        let serviceId = req.params.id;
        let data = req.body;
        let updateService = await Service.findOneAndUpdate(
            { _id: serviceId },
            data,
            { new: true }
        )
        if (!updateService) return res.send({ message: 'Servicio no encontrado' });
        return res.send({ message: 'Servicio actualizado: ', updateService });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error al actualizar el producto' });
    }
}
