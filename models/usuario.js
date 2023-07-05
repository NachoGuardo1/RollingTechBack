const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre:{type: String, required:[true,"El nombre es obligatorio"] },
    correo:{type: String, required:[true,"El correo es obligatorio"],unique: true },
    contrasena:{type: String, required:[true,"La contraseña es obligatorio"] },
    estado:{type: Boolean, default: true}
})
//quitar datos extras enla respuesta json
UsuarioSchema.methods.toJSON = function(){
    //desestructuramos los datos
    const{__v,contrasena,...usuario}=this.toObject();
    return usuario;
}

module.exports=model("Usuario", UsuarioSchema);
