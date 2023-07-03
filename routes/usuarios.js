const {Router} = require('express');
const router = Router();
const {usuariosGet, usuariosPost,usuarioPut,usuarioDelete} = require('../controllers/usuarios');

router.get('/',usuariosGet);
router.post('/',usuariosPost);
router.put('/:id',usuarioPut);
router.delete('/:id',usuarioDelete);

module.exports = router;