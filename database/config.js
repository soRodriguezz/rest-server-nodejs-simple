const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        mongoose.connect(process.env.MONGODB_ATLAS, {
            useNewUrlParser: true
        });
        console.log('Base de datos conectada');
    } catch (error) {
        console.log(error);
        throw new Error('Error al levantar BD');
    }
}

module.exports = {
    dbConnection
}
