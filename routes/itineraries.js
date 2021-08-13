const { Router } = require("../controllers/itineraryController/itineraryModule");
const router = new Router();
const { get, getComments, postComment } = require("../controllers/itineraryController/itineraryController");

//traer todas los itinerarios
router.get("/itineraries", get.getItineraries);
//traer irtinerario por nombre de ciudad
router.get("/:name", get.getItineraryByName);

router.get("/:id", get.getItineraryByName);
//obtener datos especificos de itinerario

//comentarios y likes
router.get("/comments/:id", get.getCommentsByItinerary);
router.post("/comments/:id", postComment.postComment);
//crear itinerario

module.exports = router;