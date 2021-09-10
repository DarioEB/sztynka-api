const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'});

// Conexion
const connectDB = async () => {
    try {
        await mongoose.connect( process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log('Base de datos conectada');
    } catch(error) {
        console.log('Hubo un error');
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;