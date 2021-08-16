const { Router } = require("../controllers/cityController/cityModule");
const router = new Router();
const { get, create } = require("../controllers/cityController/cityController");
const { check } = require('express-validator');

//traer todas las ciudades
router.get("/cities", get.getCities);
//traer una ciudad
router.get("/city/:id", get.getCity);
//traer una ciudad con la query completa /* SOLO USO INTERNO EN POSTMAN */
router.get("/city", get.getCityByQuery);

//crear una city nueva.
router.post("/",
    [
    check("name","Debes ingresar un nombre valido").isString().not().isEmpty().isLength({min: 3, max: 15}),
    check("country","Debes ingresar un pais valido").isString().not().isEmpty().isLength({min: 3, max: 20}),
    check("phrase","Debes ingresar una frase valida").isString().not().isEmpty().isLength({max: 50}),
    check("img","Debes ingresar una foto valida").isString().not().isEmpty(),
    ],
    create.createCity);

module.exports = router;