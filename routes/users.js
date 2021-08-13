const { Router } = require("../controllers/userController/userModule");
const router = new Router();
const { get, post } = require("../controllers/userController/userController");
const { check } = require('express-validator');
const passport = require('passport');

//traer todas los usuarios
router.get("/users", get.getUsers);

//crear un nuevo usuario
router.post("/signup",
    [
    check("firstName","Debes ingresar un nombre valido").isString().isLength({min: 3, max: 15}),
    check("lastName","Debes ingresar un apellido valido").isAlpha().isLength({min: 3, max: 15}),
    check("email","Debes ingresar un mail valido").isEmail(),
    check("password","Debes ingresar una contraseña valida").not().isEmpty().isLength({min: 6, max: 20}),    
    check("userPic","Debes ingresar una foto valida").isString().not().isEmpty(),
    check("country","Debes ingresar un pais valido").isString().isLength({min: 3, max: 25}),
    ],
    post.signUp
);

//inicio de sesion
router.post('/signin', 
    [
        check("email", "El mail no es valido.").isEmail(),
        check("password", "La contraseña no es valida").not().isEmpty(),
    ],
    post.login
);

router.get('/signinls', passport.authenticate('jwt', { session: false }), get.loginls);

module.exports = router;