const express = require ('express');
const passport = require('passport');
const router = express.Router();
const itineraryController = require('../controllers/itineraryController/itineraryController');
const { check } = require('express-validator');

router.post("/id", passport.authenticate('jwt', { session: false }), [check("text","Debes ingresar un texto valido").isString().isLength({min: 3, max: 200})],
    itineraryController.postComment.postComment);

router.put("/:id", passport.authenticate('jwt', { session: false }),
    [check("text","Debes ingresar un texto valido").isString().isLength({min: 3, max: 200}),],
    itineraryController.editComment);

router.delete('/:id', passport.authenticate('jwt', { session: false }), itineraryController.deleteComment);

module.exports = router;