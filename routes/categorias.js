const {Router}=require('express');
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar_campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');
const { categoriaExiste } = require('../helpers/db_validator');
const { obtenerCategorias, obtenerCategoria, crearCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');

const router = Router();

router.get('/',  obtenerCategorias);

router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(categoriaExiste),
    validarCampos
], obtenerCategoria);


router.post('/',[
    validarJWT,
    esAdminRole,
    check('nombre').custom(categoriaExiste),
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    validarCampos
], 
crearCategoria);

router.put('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(categoriaExiste),
    validarCampos
], actualizarCategoria);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(categoriaExiste),
    validarCampos
], borrarCategoria);

module.exports = router