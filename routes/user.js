const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { usersGet, usersPost, usersPut, usersDelete, userPatch } = require('../controllers/users');
const { esRolValido, emailExiste } = require('../helpers/db-validators');

const router = Router();

router.get('/', usersGet);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener mas de 6 caracteres').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']), // validacion estatica
    check('rol').custom( esRolValido ),
    validarCampos
], usersPost);

router.put('/:id', usersPut);

router.delete('/', usersDelete);

router.patch('/', userPatch);

module.exports = router;