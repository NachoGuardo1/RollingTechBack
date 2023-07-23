const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({
    nombre:{
        type: String,
        required: [ true, "El nombre de la categoria es obligatorio"],
        unique: true
    },
    estado: {
        type: Boolean,
        required: true,
        default: true
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        required: true  
    }
})

//quitar datos extras enla respuesta json
CategoriaSchema.methods.toJSON = function(){
    //desestructuramos los datos
    const{__v,_id,...categoria}=this.toObject();
    categoria.uid = _id;
    return categoria;
}

module.exports = model("Categoria", CategoriaSchema);