const Usuario = require('../models/user');
const bcrypt = require('bcryptjs');

const { generarJWT } = require('../helpers/generar-jwt');

const login = async (req, res) => {

    const { correo, password } = req.body;

    try {

        const usuario = await Usuario.findOne({ correo });

        if( !usuario ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos'
            });
        }

        if( !usuario.estado ) {
            return res.status(400).json({
                msg: 'Usuario desactivado'
            });
        }

        const validPassword = bcrypt.compareSync( password, usuario.password );

        if( !validPassword ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos'
            });
        }

        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        })

    } catch (error) {
        res.status(500).json({
            msg: "Hable con el admin"
        })
    }
}

module.exports = {
    login
}