const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/user');

const usersGet = async (req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    // const usuarios = await Usuario.find({ estado: true})
    //     .limit(limite)
    //     .skip(desde);

    // const total =  await Usuario.countDocuments({ estado: true});

    const [ total, usuarios ] =  await Promise.all([
        Usuario.countDocuments({ estado: true}),
        Usuario.find({ estado: true})
            .limit(limite)
            .skip(desde)
    ]);

    res.json({
        total,
        usuarios,
    });

}

const usersPost = async (req, res) => {

    const { nombre, correo, password, rol } = req.body;

    const usuario = new Usuario({ nombre, correo, password, rol });

    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    res.status(201).json({
        usuario
    });
}

const usersPut = async (req, res) => {

    const { id } = req.params;

    const { _id, password, google, correo, ...resto } = req.body;

    // TODO validar contra base de datos
    if( password ) {
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.status(200).json({
        usuario
    });
}

const usersDelete = async (req, res) => {

    const { id } = req.params;

    // const usuario = await Usuario.findByIdAndDelete( id );
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.status(200).json({
        usuario
    });
}

const userPatch = (req, res) => {
    res.status(200).json({
        msg: "delete API"
    });
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete,
    userPatch
}

// https://stackoverflow.com/questions/30967822/when-do-i-use-path-params-vs-query-params-in-a-restful-api