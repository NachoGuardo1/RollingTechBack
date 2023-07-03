const {Schema, model} = require('mongoose');

const UsuariosSchema = Schema({
    nombre:{type: String, required:[true,"El nombre es obligatorio"] },
    correo:{type: String, required:[true,"El correo es obligatorio"] },
    password:{type: String, required:[true,"La contraseña es obligatorio"] },
    img:{type: String},
    rol:{type: String, required: true, enum["USER_ROLE","ADMIN_ROLE"]},
    estado:{type: Boolean, default:true}
})

module.exports=model("Usuario", UsuarioSchema);
