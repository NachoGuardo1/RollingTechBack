const {request,response} = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');


const validarJWT= async (req=request,res=response,next) => {

    const token = req.header('x-token');

    //preguntar si enviaron el token
    if (!token){
        return res.json(401).json({
            msg: "No hay token en la petición"

        })
    }

    try{
        //verificar el token y obtener el uid
        const {uid} = jwt.verify(token,process.env.SECRETORPRIVATEKEY)
        //obtener los datos delusiuario autenticado
        const usuario = await Usuario.findById(uid);
        //validadr si el usuario exisete
        if(!usuario){
            return res.status(401).json({
                msg: "Token no válido - usuario no existe"
            });
        };

        //verificar si el usuario esta activo
        if (!usuario.estado){
            return res.status(401).json({
                msg: "Token no valido - usuario inactivo"
            });
        };

        req.usuario = usuario;

        next();


    }catch(error){
        console.log(error)
        res.status(401).json({
            msg: "Token no valido",
        })
    };
  
}

module.exports ={
    validarJWT,
}
