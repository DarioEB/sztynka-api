const Service = require('../models/Service');
const Category = require('../models/Category');

exports.getServices = async (req, res) => {
    try {
        const services = await Service.find({enabled: true});
        
        res.json({services});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.addService = async (req, res) => {
    try {

        // Comprobar si existe la categoría
        const {category} = req.body;
        const categoryExists = await Category.findById(category);
        if(!categoryExists) {
            return res.status(404).json({ msg: 'Categoría no encontrada'});
        }

        // Crear el servicio
        const service = new Service(req.body);
        await service.save();
        res.json({service, msg: 'Servicio Creado correctamente'});

    } catch(error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.updateService = async (req, res) => {
    const { name, price, category, enabled } = req.body;
    try {
        let service;
        service = await Service.findById(req.params.id);
        if(!service) {
            return res.status(404).json({msg: 'Servicio no encontrado'});
        }

        const newService = {}
        newService.name = name;
        newService.price = price;
        newService.category = category;
        newService.enabled = enabled;

        service = await Service.findOneAndUpdate({_id: req.params.id}, newService, {new: true});
        res.json({service});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}


