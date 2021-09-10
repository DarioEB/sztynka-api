const Date = require('../models/Date');

exports.createDate = async (req, res) => {

    try {
        const date = new Date(req.body);
        await date.save();
        res.json({ date });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.getDates = async (req, res) => {

    try {
        const dates = await Date.find();
        res.json({dates});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.deleteDate = async (req, res) => {
    try {
        let date = await Date.findById(req.params.id);

        if(!date) {
            return res.status(404).json({msg: 'Fecha no encontrada'});
        }
        await Date.findOneAndRemove({_id: req.params.id});
        res.json({date});
    } catch (error) {
        constole.log(error);
        res.status(500).send('Hubo un error');
    }
}

