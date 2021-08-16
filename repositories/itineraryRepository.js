const Itinerary = require ("../database/models/itineraryModel");

const getAll = async() => await Itinerary.find();
const count = async() => await Itinerary.count();
const getItineraryByCityId = async cityId => await Itinerary.find({cityId});
const getItineraryById = async id => await Itinerary.findById(id);
const getbyCommentId = async (id, userId) => await Itinerary.findOne({"comments._id": id, "comments.userId" : userId});
const postComments = async (comment, itineraryId) => await Itinerary.updateOne({ _id: itineraryId }, { comments: comment });
const editComment = async (id, text) => await Itinerary.findOneAndUpdate({ "comments._id": id }, { $set: { "comments.$.text": text } }, { new: true });

module.exports = { getAll, count, getItineraryByCityId, getItineraryById, getbyCommentId, postComments, editComment};