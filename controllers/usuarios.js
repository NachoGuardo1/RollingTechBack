const {response,request} = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');

//el Get es para obtejer los datos de la BD
const usuariosGet = (req=request,res=response) =>{
    const datos = req.query;
    res.json({
        mensaje:'Get usuarios',
        datos
    })
}

//el post es para guardar los datos en la BD
const usuariosPost = async (req=request,res=response) =>{
    //recibir el cuerpo de la peticion
    const datos = req.body;
    const {nombre,correo,contrasena,estado}=datos;
    const usuario = new Usuario({nombre,correo,contrasena,estado});

    
    //verificar que el correo no exist en la BD
    const existeCorreo= await Usuario.findOne({correo})
    if (existeCorreo){
        return res.status(400).json({msg:"El correo ya se encuentra registrado en la Base de Datos."})
    }

    //encriptar la contraseña
    const salt=bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(contrasena,salt);
    usuario.contrasena=hash;

    //guardar en la BD
    await usuario.save();

    res.json({
        usuario,
        messaje: 'Usuario creado exitosamente'
    })

    /*const {nombre,correo} = req.body;
    await res.json({
        mensaje: 'Post Usuarios',
        nombre,
        correo
    })*/
}


//el Put nos permite leer o actualizar los datos de laBD
const usuarioPut = (req=request,res=response) =>{
    res.json({
        mensaje: 'Put usuario'
    })
}

const usuarioDelete = (req=request,res=response) =>{
    res.json({
        mensaje: 'Delete usuario'
    })
    
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuarioPut,
    usuarioDelete
}