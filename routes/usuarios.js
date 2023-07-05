const {Router} = require('express');
const {check} = require('express-validator');
const router = Router();
const {usuariosGet, usuariosPost,usuarioPut,usuarioDelete} = require('../controllers/usuarios');

router.get('/',usuariosGet);

//router.post('/',usuariosPost);
router.post('/', 
[
    check('nombre',"El nombre es obligatorio.").notEmpty(),
    check('contrasena',"La contraseña debe tener un mínimo de 6 caracteres.").isLength({min:6}),
    check('correo',"El correo no es válido.").isEmail()
],
usuariosPost
)



router.put('/:id',usuarioPut);
router.delete('/:id',usuarioDelete);

module.exports = router;