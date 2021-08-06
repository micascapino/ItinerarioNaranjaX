const express = require("express");
const router = express.Router();
const City = require("../models/cityModel");
const Itinerary = require("../models/itineraryModel");

//traer todas las ciudades
router.get ("/all", (req, res) => {
	City.find({})
		.then (data => {
			res.send (data);
		})
		.catch (err => console.log (err));
});

//agregar nueva ciudad
router.post("/", (req,res) => {
	City.find({})
		.then(cities => {
			//comprueba que no exista la ciudad en ese pais en la bd
			if (!cities.find(c => c.name === req.body.name && c.country === req.body.country)){
				const newCity = new City({
					name: req.body.name,
					country: req.body.country,
					phrase: req.body.phrase,
					img: req.body.img
				});
				return newCity.save();
			}
			res.status(400).send("Esta ciudad ya existe en la base de datos.");    
		})
    
		.then(city => {
			//si se pudo guardar correctamente muestra la ciudad con sus datos.
			res.send(city);
		})
		.catch(err => {   
			console.log(err);  
			res.status(500).send("Error de servidor.");
		});

}); 

//mostrar ciudad por nombre
router.get ("/:name",
	(req, res) => {
		let cityName = req.query.name;
		City.findOne({name: cityName})
			//esto va a encontrar la ciudad y devolver todos sus datos
			.then(city => {
				//consigo el id de la ciudad para buscar el itinerario
				const actualId = city._id;
				Itinerary.findOne({cityId: actualId})
					.then(iti => {
						res.send(iti);
					})
					.catch(err => {
						console.log(err);
						res.send("No encontramos itinerarios para esta ciudad");
					});
				
			})
			.catch (err => {
				console.log (err);
				res.send("Ciudad no encontrada");
			});
	}
);

module.exports = router;