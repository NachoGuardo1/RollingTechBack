const {response,request}=require('express');
const bcrypt= require('bcryptjs');
const Usuario = require('../models/usuario');
const {generarJWT}=require('../helpers/generar-jwt');

const login = async(req=request,res=response)=>{
    const {correo,contrasena} =req.body;

    
    try{
        const usuario =  await Usuario.findOne({correo});
        //verificar si el correo existe
        if (!usuario){
            return res.status(400).json({
                msg: "Correo incorrecto",
            })
        }

        //verificar que el correo este activo
        if (!usuario.estado){
            return res.status(400).json({
                msg: "Correo o contraseña incorrecta / el usuario esta inactivo",
            })
        }

        //verificar que la contraseña sea la corretoa
        const validaContrasena =  bcrypt.compareSync(contrasena,usuario.contrasena);
        if (!validaContrasena){
            return res.status(400).json({
                msg: "Contraseña incorrecta.",
            })
        }

        //generar token
        const token = await generarJWT(usuario.id);

        res.json({
            msg:" LOGIN OK",
            usuario,
            token
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            msg: "Hubo un problema en la generación del token. Comuniquese con el Administrador."

            
        })
    }

}

module.exports={
    login
}