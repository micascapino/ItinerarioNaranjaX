const Itinerary = require ("../database/models/itineraryModel");

const getAll = async() => await Itinerary.find();
const count = async() => await Itinerary.count();
const getItineraryByCityId = async actualId => await Itinerary.findOne({cityId: actualId});
const getItineraryById = async id => await Itinerary.findById(id);
const getbyCommentId = async (commentId, userId) => Itinerary.findOne({'comments._id': commentId, 'comments.userId' : userId});

module.exports = { getAll, count, getItineraryByCityId, getItineraryById, getbyCommentId };
