const {request,response}=require('express');


const ValidarPrecio =(req=request,res=response,next)=>{
    const precio = req.header('precio');
    console.log('estoy en validar precio');
    if(precio <= 0){
        return res.status(401).json({
            msg: `Precio Cero (${precio}). Debe ingresar un valor superior a cero`
        });
    }

    next();
};

module.exports={
    ValidarPrecio,
}