const { Router } = require("../controllers/itineraryController/itineraryModule");
const router = new Router();
const { get } = require("../controllers/itineraryController/itineraryController");

//traer todas los itinerarios
router.get("/itineraries", get.getItineraries);

module.exports = router;