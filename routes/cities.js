const { Router } = require("../controllers/cityController/cityModule");
const router = new Router();
const { get, create } = require("../controllers/cityController/cityController");

//traer todas las ciudades
router.get("/cities", get.getCities);
//traer una ciudad
router.get("/city/:id", get.getCity);
//traer una ciudad con la query completa
router.get("/city", get.getCityByQuery);

//crear una city nueva.
router.post("/", create.createCity);

module.exports = router;