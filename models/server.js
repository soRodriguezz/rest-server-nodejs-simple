const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosRoutePath = '/api/users';

        // Middlewares
        this.middlewares();

        // Rutas de la app
        this.routes();
    }

    middlewares() {
        //directorio publico
        this.app.use( express.static('public') );

        // CORS
        this.app.use(cors());

        // Parse Body
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.usuariosRoutePath, require('../routes/user'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor en puerto http://localhost:${ this.port }`);
        });
    }
}

module.exports = Server;