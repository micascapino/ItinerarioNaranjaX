const { Router } = require("../controllers/itineraryController/itineraryModule");
const router = new Router();
const itineraryController = require("../controllers/itineraryController/itineraryController");

//traer todas los itinerarios 
router.get("/all", itineraryController.get.getItineraries);
//traer irtinerario por id de ciudad
router.get("/:cityId", itineraryController.get.getItineraryByName);
router.get('/checkuser/:id', itineraryController.checkUser);

module.exports = router;