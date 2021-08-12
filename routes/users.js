const { Router } = require("../controllers/userController/userModule");
const router = new Router();
const { get, post } = require("../controllers/userController/userController");
const { check } = require('express-validator');

//traer todas los usuarios
router.get("/users", get.getUsers);
//crear un nuevo usuario
router.post("/signup",
    [
    check("firstName","Debes ingresar un nombre valido").isAlpha().not().isEmpty().isLength({min: 3, max: 15}),
    check("lastName","Debes ingresar un apellido valido").isAlpha().not().isEmpty().isLength({min: 3, max: 15}),
    check("mail","Debes ingresar un mail valido").isEmail(),
    check("password","Debes ingresar una contraseña valida").not().isEmpty().isLength({min: 6, max: 20}),    
    check("userPic","Debes ingresar una foto valida").isString().not().isEmpty(),
    check("country","Debes ingresar un pais valido").isAlpha().not().isEmpty().isLength({min: 3, max: 15}),
    ],
    post.signUp
);

//registrar inicio de sesion
router.post('/login', 
    [
        check("mail", "El mail no es valido.").isEmail(),
        check("password", "La contraseña no es valida").not().isEmpty(),
    ],
    post.login
);

module.exports = router;