/* 
    Auth routes
    host + /api/auth
    db_user: mern_user
    db_password: WHQjEGhwoCbXfEXG
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidate } = require('../middlewares/field-validator')
const { createUser, loginUser, revalidateToken } = require('../controllers/auth');
const { validateJWT } = require('../middlewares/jwt-validator');

const router = Router();

router.post(
    '/new',
    [ //middlewares
        check('name', 'The name is required').not().isEmpty(),
        check('email', 'The email is required').isEmail(),
        check('password', 'The password must be at least 6 characters').isLength({ min: 6 }),
        fieldValidate
    ] , 
    createUser
);

router.post(
    '/', 
    [ //middlewares
        check('email', 'The email is required').isEmail(),
        check('password', 'The password must be at least 6 characters').isLength({ min: 6 }),
        fieldValidate
    ],
    loginUser);

router.get('/renew', validateJWT ,revalidateToken);

module.exports = router