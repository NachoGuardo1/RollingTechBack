
const Rol = require ('../models/rol');
const Usuario =require('../models/usuario');

//Validar Rol
const esRolValido = async (rol) => {
    const existeRol=await Rol.findOne({rol})

    if (!existeRol){
        throw new Error (`El rol ${rol} no existe en la Base de Datos.`);
    }

}


//validar mail
const emailExiste = async (correo)=>{
    //verificar que el correo no exist en la BD
    const existeCorreo= await Usuario.findOne({correo})
    if (existeCorreo){
       // return res.status(400).json({msg:"El correo ya se encuentra registrado en la Base de Datos."})
       throw new Error(`El correo ${correo} ya se encuentra registrado.`);
    }

}

//funcion para ver si existe el id del usuario
const usuarioExiste = async(id)=>{
    const existeUsuario = await Usuario.findById(id)
    if (!existeUsuario){
        throw new Error (`El id ${id} no corresponde a ning{un usuario registrado.}`);
    }
}


module.exports ={
    esRolValido,
    emailExiste,
    usuarioExiste
}