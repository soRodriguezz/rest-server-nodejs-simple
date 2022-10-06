const { response } = require('express');

const usersGet = (req, res = response) => {

    const queryParams = req.query;

    res.json({
        msg: "get API",
        queryParams
    });
}

const usersPost = (req, res) => {
    const { nombre } = req.body;

    res.status(201).json({
        msg: `Saludos ${ nombre }`
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

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete
}

// https://stackoverflow.com/questions/30967822/when-do-i-use-path-params-vs-query-params-in-a-restful-api