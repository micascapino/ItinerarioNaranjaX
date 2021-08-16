const { Router } = require("../controllers/itineraryController/itineraryModule");
const router = new Router();
const itineraryController = require("../controllers/itineraryController/itineraryController");
const passport = require("passport");
const { check } = require("express-validator");

//traer todas los itinerarios 
router.get("/itineraries", itineraryController.get.getItineraries);
//traer irtinerario por id de ciudad
router.get("/itineraries/:cityId", itineraryController.get.getItineraryByName);

//comentarios
router.post("/comments/:id", passport.authenticate("jwt", { session: false }), [check("text","Debes ingresar un texto valido").isString().isLength({min: 3, max: 200})],
    itineraryController.postComment.postComment);
router.put("/comment/:id", passport.authenticate("jwt", { session: false }),
    [check("text","Debes ingresar un texto valido").isString().isLength({min: 3, max: 200}),],
    itineraryController.editComment);
router.delete("/comment/:id", passport.authenticate("jwt", { session: false }), itineraryController.deleteComment);

router.get("/checkuser/:id", passport.authenticate("jwt", { session: false }), itineraryController.checkUser);
router.get("/like/:id", passport.authenticate("jwt", { session: false }), itineraryController.like);


module.exports = router;