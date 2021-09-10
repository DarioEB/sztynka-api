const User = require('../models/User');
const bcryptjs = require('bcryptjs');

exports.createUser = async (req, res) => {

    const { username, password } = req.body;
    
    let user = await User.findOne({username});
    // Verificación de existencia del usuario
    if(user) {
        return res.status(400).json({msg: 'El usuario ya está registrado'});
    }

    // En caso de que el usuario no esté registrado
    user = new User(req.body);
    
    // Hash password
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt);

    try {
        await user.save();
        res.json({msg: 'Usuario registrado con exito', user});
    } catch (error) {
        console.log(error);
    }
}