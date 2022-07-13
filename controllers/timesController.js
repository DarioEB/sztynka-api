const Time = require('../models/Time');

exports.getTimes = async (req, res) => {

    try {
        const times = await Time.find().sort({position: 1});
        // console.log(times);
        res.json({times});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
