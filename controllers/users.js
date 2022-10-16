const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/user');

const usersGet = (req, res = response) => {

    const queryParams = req.query;

    res.json({
        msg: "get API",
        queryParams
    });
}

const usersPost = async (req, res) => {

    const { nombre, correo, password, rol } = req.body;

    const usuario = new Usuario({ nombre, correo, password, rol });

    const existeEmail = await Usuario.findOne({ correo });

    if( existeEmail ) return res.status(400).json({ msg: "El correo ya esta registrado"});

    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    res.status(201).json({
        usuario
    });
}

const usersPut = (req, res) => {

    const { id } = req.params;

    res.status(200).json({
        msg: `Usuario con id = ${ id }`
    });
}

const usersDelete = (req, res) => {
    res.status(200).json({
        msg: "delete API"
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