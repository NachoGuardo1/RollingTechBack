
const Rol = require ('../models/rol');
const Usuario =require('../models/usuario');
const Producto=require('../models/productos');
const Categoria=require('../models/categoria');

const contraseñaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,10}$/;

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

//validar prod
const nombreProdExiste = async (nombre)=>{
    //verificar que el correo no exist en la BD
    console.log('estoy en nombreProdexiste');
    console.log(nombre);
    const existeProd= await Producto.findOne({nombre})
    console.log(existeProd);
    if (existeProd){
       // return res.status(400).json({msg:"El correo ya se encuentra registrado en la Base de Datos."})
       throw new Error(`El nombre del producto ${nombre} ya se encuentra registrado.`);
    }

}


//funcion para ver si existe el id del producto
const productoExiste = async(id)=>{
    const existeProducto = await Producto.findById(id)
    if (!existeProducto){
        throw new Error (`El id ${id} no corresponde a ning{un producto registrado.}`);
    }
}


//funcion para ver si existe el id de la categoria
const categoriaExiste = async(nombre)=>{
    console.log('en Categoria existe');
    console.log(nombre);

    const existeCategoria =  await Categoria.findOne({nombre});
    //verificar si el correo existe
    if (existeCategoria){
        throw new Error (`La categoria ${nombre} ya existe.}`);
    }

}

//Validar Categoria
const esCategoriaValida = async (nombre) => {
    console.log(nombre);
    const existeCategoria=await Categoria.findOne({nombre})
    console.log('estoy en esCategoriaValida');
    console.log(existeCategoria);
    if (!existeCategoria){
        throw new Error (`La categoria ${nombre} no existe en la Base de Datos.`);
    }
}

//Validar Precio
const esPrecioValido = async (precio) => {
    console.log(precio);
    if (precio<=0){
        throw new Error (`El precio no puede ser igual o inferior a cero.`);
    }
    console.log('estoy en esPrecioValido');
}

//Validar Precio
const validarFormatoContrasena = async (contrasena) => {
    console.log(contrasena);

    if (!contraseñaRegex.test(contrasena)) {
        throw new Error (`La contraseña no cumple con los requisitos de seguridad`);
      }

    console.log('estoy en validarFormatocontraseña');
}


module.exports ={
    esRolValido,
    emailExiste,
    usuarioExiste,
    nombreProdExiste,
    productoExiste,
    categoriaExiste,
    esCategoriaValida,
    esPrecioValido,
    validarFormatoContrasena
}

