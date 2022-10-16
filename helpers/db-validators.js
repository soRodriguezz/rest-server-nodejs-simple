const Role = require('../models/role');

const esRolValido = async (rol = '') => { // validacion de bd
    const existeRole = await Role.findOne({ rol });
    if( !existeRole ){
        throw new Error(`El rol ${ rol } no esta registrado en la BD`);
    }
}

const emailExiste = async () => {

}

module.exports = {
    esRolValido,
    emailExiste
};