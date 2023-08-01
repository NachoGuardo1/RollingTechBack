

const {Router}=require('express');
const {check} = require('express-validator');
const {productosGet, productosPost,productoPut,productoDelete} = require('../controllers/productos');
const {productoExiste, nombreProdExiste, esCategoriaValida, esPrecioValido } = require('../helpers/db_validator');

const { validarCampos } = require('../middlewares/validar_campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.get('/',productosGet);

router.post('/', 
[
    validarJWT,
    check('nombre',"El nombre es obligatorio.").notEmpty(),
    check('nombre').custom(nombreProdExiste),
    check('descrip',"La descripcion es obligatoria.").notEmpty(),
    //check('precio',"El precio es obligatorio.").isNumeric({min:1}),
    //check('precio','El precio es obligatorio'  ).isNumeric({ min: 1 }),
    check ('precio').custom(esPrecioValido),
    check ('categoria').custom(esCategoriaValida),
    //ValidarPrecio,
    validarCampos

],
productosPost
)

//El put es para actualizaz valores
router.put('/:id',
[
    check("id","No es un ID válido").isMongoId(),
   // check("id").custom(productoExiste),
    //check("categoria").custom(esCategoriaValida),
   // validarCampos
],
productoPut)

router.delete('/:id',
[
    check("id","El Id no es válido").isMongoId(),
    check("id").custom(productoExiste),
    validarCampos
    
],
productoDelete
)

module.exports = router;