const Role = require('../models/role');
const User = require('../models/user');

const esRolValido = async (rol = '') => { // validacion de bd
    const existeRole = await Role.findOne({ rol });
    if( !existeRole ){
        throw new Error(`El rol ${ rol } no esta registrado en la BD`);
    }
}

const emailExiste = async ( correo = '' ) => {

    const existeEmail = await User.findOne({ correo });

    if( existeEmail ){
        throw new Error(`El email ${ correo } ya esta registrado`);
    }
}

const existeUsuarioPorId = async ( id = '' ) => {
    const existeUsuario = await User.findById( id );
    if( !existeUsuario ){
        throw new Error(`El id ${ id } no existe`);
    }
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId
};