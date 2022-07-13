const Shift = require('../models/Shift');
const Time = require('../models/Time');

exports.createShift = async (req, res) => {
    
    const shiftsDate = await Shift.find({date: req.body.date});

    if(shiftsDate.map( s => s.timename).includes(req.body.timename)) {
        return res.status(400).json({
            msg: 'Este horario ya no está disponible, por favor selecciona nuevamente la fecha y el horario'
        });
    }

    try {
        const shift = new Shift(req.body);  

        await shift.save();
        res.json({shift, msg: 'Turno creado correctamente'});
    } catch (error) { 
        return res.status(500).json({
            msg: 'Ocurrió un error al crear el turno, intente nuevamente'
        })
    }
}

exports.getShifts = async (req, res) => {
    try {
        const shifts = await Shift.find();
        
        res.json({shifts})
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.getShiftsDate = async (req, res) => {
    
    const date = req.params.date;
    
    try {
        const times = await Time.find({ $or:[ {'enabled':"false"}, {'enabled':false} ]}).sort({position: 1});
        const shifts = await Shift.find({date});

        res.json({times, shifts});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.updateShift = async (req, res) => {
    try {
        const { name , date, time, timename, services, price, done } = req.body
        
        let shift;
        shift = await Shift.findById(req.params.id);

        if(!shift) {
            return res.status(400).json({msg: 'Turno no encontrado'});
        }

        // Nuevo objeto con la informacipon
        const newShift = {}
        newShift.name = name;
        newShift.date = date;
        newShift.time = time;
        newShift.timename = timename;
        newShift.services = services;
        newShift.price = price;
        newShift.done = done;

        shift = await Shift.findOneAndUpdate({_id: req.params.id}, newShift, {new: true});
        res.json({shift});

    } catch (error) {
        console.log(error);
        res.stutas(500).send('Hubo un error');
    }
}