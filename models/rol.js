const {Schema,model}=require('mongoose');
const RolSchema = Schema({
    rol:{
        type: String, requerid: [true,"El rol es obligatorio"]
    }
})

module.exports=model("rol",RolSchema);