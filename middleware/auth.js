const jwt = require('jsonwebtoken');
require('dotenv').config({path: 'variables.env'});

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');

    if(authHeader) {
        // Obtener el token
        const token = authHeader.split(' ')[1];

        // Comprobamos el jsonwebtoken
        try {
            const user = jwt.verify(token, process.env.SECRET);
            req.user = user;
        } catch (error) {
            console.log(error);
        }
    }

    return next();
}