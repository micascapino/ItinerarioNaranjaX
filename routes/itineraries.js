const { Router } = require("../controllers/itineraryController/itineraryModule");
const router = new Router();
const { get } = require("../controllers/itineraryController/itineraryController");

//traer todas los itinerarios
router.get("/itineraries", get.getItineraries);
//traer irtinerario por nombre de ciudad
router.get("/itinerary/:name", get.getItineraryByName);

module.exports = router;