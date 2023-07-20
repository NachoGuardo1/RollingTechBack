//midlewares es una funcion que se ejecuta entre el front y el servidor.

const {Router} = require('express');
const {check} = require('express-validator');
const router = Router();
const {usuariosGet, usuariosPost,usuarioPut,usuarioDelete} = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar_campos');

const {esRolValido,emailExiste,usuarioExiste} = require('../helpers/db_validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');


router.get('/',usuariosGet);

router.post('/', 
[
    check('nombre',"El nombre es obligatorio.").notEmpty(),
    check('contrasena',"La contraseña debe tener un mínimo de 6 caracteres.").isLength({min:6}),
    check('correo').custom(emailExiste),
    check ('rol').custom(esRolValido),
    validarCampos

],
usuariosPost
)

//El put es para actualizaz valores
router.put('/:id',
[
    validarJWT,
    check("id","No es un ID válido").isMongoId(),
    check("id").custom(usuarioExiste),
    check("rol").custom(esRolValido),
    validarCampos
],
usuarioPut)

//router.put('/:id',usuarioPut);
router.delete('/:id',
[
    validarJWT,
    esAdminRole,
    check("id","El Id no es válido").isMongoId(),
    check("id").custom(usuarioExiste),
    validarCampos
    
],
usuarioDelete
)

module.exports = router;