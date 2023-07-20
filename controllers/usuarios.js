const {response,request} = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const Rol = require('../models/rol');

const {validationResult} = require('express-validator');


//el Get es para obtejer los datos de la BD
const usuariosGet = async (req=request,res=response) =>{
    const {desde=0,limite=5} = req.query;
    const query = {estado:true}

    console.log("HERE");

    const [total,usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query).skip(desde).limit(limite)

    ])

    res.json({
        mensaje:"Get usuarios",
        total,
        usuarios
    })
}

//el post es para guardar los datos en la BD
const usuariosPost = async (req=request,res=response) =>{
    //recibir el cuerpo de la peticion
    const datos = req.body;
    console.log(datos);
    const {nombre,correo,contrasena,estado,rol}=datos;
    const usuario = new Usuario({nombre,correo,contrasena,estado,rol});
    console.log(usuario);
    //encriptar la contraseña
    const salt=bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(contrasena,salt);
    usuario.contrasena=hash;

    //guardar en la BD
    await usuario.save();

    res.json({
        usuario,
        messaje: "Usuario creado exitosamente"
    })

}


//el Put nos permite leer o actualizar los datos de laBD
const usuarioPut = async (req=request,res=response) =>{
    //tenemos q obtener el id para poder actualizar- lo obtendremos de req.param
    const {id}= req.params;

    //desestructuramos los datos q nos mandan del front
    const {contrasena,correo,...resto}=req.body;
    //si actualizo el passwoer, debo cifrarlo o encriptarlo
    if (contrasena){
        const salt =bcrypt.genSaltSync(10);
        resto.contrasena=bcrypt.hashSync(contrasena,salt);
    }
    resto.correo=correo;
    //buscar el usuario en la BD y actualizar
    const usuario = await Usuario.findByIdAndUpdate(id,resto,{new: true})

    res.json({
        mensaje: "Usuario actualizado",
        usuario
    })
}


const usuarioDelete = async (req=request,res=response) =>{
    const {id}=req.params;
    const usuarioAutenticado =req.usuario;
   //le cambiamos el estado a false
    const usuario= await Usuario.findById(id);

    if (!usuario.estado){
        return res.json({
            msg: "El usuario ya se encuentra en estado Inactivo.",
        })
    }

    const usuarioInactivado=await Usuario.findByIdAndUpdate(id,{estado:false},{new:true});
    
    res.json({
        mensaje: "Usuario modificado. Se cambio a estado INACTIVO",
        usuarioInactivado,
        usuarioAutenticado

    })
    
};


module.exports = {
    usuariosGet,
    usuariosPost,
    usuarioPut,
    usuarioDelete
};



