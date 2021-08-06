const mongoose = require("mongoose");

//implementacion del modelo itinerary
const itinerarySchema = new mongoose.Schema ({
	title: { type: String, required: true },
	img: { type: String, required: true },
	activities: { type: Object },
	authorName: { type: String, required: true },
	authorPic: { type: String, required: true },
	price: { type: Number, required: true, min: 1, max: 5 },
	duration: { type: Number, required: true, min: 1 },
	likes: { type: Number, default: 0 },
	hashtags: { type: [String] },
	comments: { type: Object },
	usersLike: { type: [String] },
	cityId: { type: Object, required: true }
}); 

module.exports = mongoose.model ("itinerary", itinerarySchema);