const {response,request} = require('express');

const usuariosGet = (req=request,res=response) =>{
    const datos = req.query;
    res.json({
        mensaje:'Get usuarios',
        datos
    })
}

const usuariosPost = async (req=request,res=response) =>{
    const {nombre,correo} = req.body;
    await res.json({
        mensaje: 'Post Usuarios',
        nombre,
        correo
    })
}



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