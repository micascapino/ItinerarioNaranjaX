const express = require("express");
const router = express.Router();
const Itinerary = require("../models/itineraryModel");

//traer todas los los itinerarios
router.get ("/all", (req, res) => {
	Itinerary.find({})
		.then (data => {
			res.send(data);
		})
		.catch (err => console.log (err));
});

module.exports = router;