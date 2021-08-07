const { Router } = require("../itineraryCase/itineraryModule");
const router = new Router();
const { get } = require("../itineraryCase/itineraryController");

//traer todas los los itinerarios
router.get("/itineraries", get.getItineraries);

module.exports = router;