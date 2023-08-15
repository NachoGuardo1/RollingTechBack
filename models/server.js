
const express = require('express')
const cors = require('cors');
const {dbConnection} = require('../database/config')

class Server{
    constructor(){
        this.app = express();
        this.port=process.env.PORT;
        this.authPath="/api/auth";
        this.usuariosPath ='/api/usuarios';
        this.productosPath ='/api/productos';
        this.categoriasPath='/api/categoria';
        this.buscarPath='/api/buscar';

        //conecatar con BD
        this.conectarDB()
        //middlewares
        this.middlewares();

        //funcion para las rutas
        this.routes();

    }

    async conectarDB(){
        await dbConnection()
    }

    middlewares(){
        //cors
        this.app.use(cors());
        //leer lo q el usuario envia por el cuerpo de la peticion
        this.app.use(express.json());
        //definir la carpeta publica
        this.app.use(express.static('public'));

        ///agregado por aei para probar lo de cors
        this.app.use(function(req,res,next){
            const dominiosPermitidos =['https://rolling-tech-v5l8-git-main-nachoguardo1.vercel.app/','http://localhost:5173/']
            const origin = req.headers.origin;
            if (dominiosPermitidos.indexOf(origin)> -1){
                res.setHeader('Access-Control-Allow-Origin', origin);
            }
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Accept');
            res.setHeader('Access-Control-Allow-Credentials', true);

            next;
        })

    }

    routes(){
        this.app.use(this.authPath,require('../routes/auth'));
        this.app.use(this.usuariosPath,require('../routes/usuarios'));
        this.app.use(this.categoriasPath,require('../routes/categorias'));
        this.app.use(this.productosPath,require('../routes/productos'));
        this.app.use(this.buscarPath,require('../routes/buscar'));

    }
    
    listen(){

    
        this.app.listen(this.port,() =>{
            console.log('Server online por puerto', this.port)

        })
    }

}

module.exports = Server;
