const {Schema, model}= require ('mongoose');

const ProductoSchema = Schema({
    nombre:{type: String, required:[true,"El nombre del producto es obligatorio."] ,unique: true },
    descrip:{type: String, required:[true,"La descripción del producto es obligatoria."]},
    precio:{type: Number, required:[true,"El ingreso del precio del producto es obligatorio"] },
    categoria: {type: String, 
        required: true, 
    },
    img:{type: String,required:[true,"La imagen es obligatoria"] },
    estado:{type: Boolean, required:true, default: true},
    usuario:{
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        required: true  
    }

})

//quitar datos extras enla respuesta json
ProductoSchema.methods.toJSON = function(){
    //desestructuramos los datos
    const{__v,_id,...producto}=this.toObject();
    producto.uid = _id;
    return producto;
}


module.exports=model("Producto", ProductoSchema);

