const { Router } = require("../controllers/authController/authModule");
const router = new Router();
const { create } = require("../controllers/authController/authController");
const { check } = require('express-validator');

router.post('/', 
    [
        check("mail", "El mail no es valido.").isEmail(),
        check("password", "La contraseña no es valida").not().isEmpty(),
    ],
    create.login
);

module.exports = router;