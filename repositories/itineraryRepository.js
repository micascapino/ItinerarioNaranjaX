const Itinerary = require ("../database/models/itineraryModel");

const getAll = async() => await Itinerary.find();
const count = async() => await Itinerary.count();

module.exports = { getAll, count };
