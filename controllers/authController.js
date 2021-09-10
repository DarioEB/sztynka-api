const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({path: 'variables.env'});

exports.authUser = async (req, res, next) => {

    const { username, password } = req.body; // Buscar usuario
    const user = await User.findOne({username});
    

    if(!user) {
        res.status(401).json({msg: 'Los datos ingresados son incorrectos'});
        return next();
    }

    // Verificar el password y autenticar el usuario
    if(bcryptjs.compareSync(password, user.password)) {
        // Crear el JWT
        const token = jwt.sign({
            id: user._id,
            username: user.username
        }, process.env.SECRET, {
            expiresIn: '5h'
        });

        res.json({token});
    } else {
        res.status(401).json({msg: 'Los datos ingresados son incorrectos'});
        return next();
    }
}

// Si el middle es correcto entonces devuelve el usuario a partir del token
exports.userAuthenticated = async (req, res, next) => {
    res.json({user: req.user});
}