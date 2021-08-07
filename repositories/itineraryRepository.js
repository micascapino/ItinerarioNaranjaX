const Itinerary = require ("../database/models/itineraryModel");

const getAll = async() => await Itinerary.find();
const count = async() => await Itinerary.count();
const getItineraryByCityId = async actualId => await Itinerary.findOne({cityId: actualId});

module.exports = { getAll, count, getItineraryByCityId };
