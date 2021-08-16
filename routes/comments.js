const express = require ('express');
const router = express.Router();
const itineraryController = require('../controllers/itineraryController/itineraryController');

//corregir
router.post("s/:id", passport.authenticate('jwt', { session: false }), [check("text","Debes ingresar un texto valido").isString().isLength({min: 3, max: 200})],
    itineraryController.postComment.postComment);

router.put("/:id", passport.authenticate('jwt', { session: false }),
    [check("text","Debes ingresar un texto valido").isString().isLength({min: 3, max: 200}),],
    itineraryController.editComment);

router.delete('/:id', passport.authenticate('jwt', { session: false }), itineraryController.deleteComment);

module.exports = router;