const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId },
    text: { type: String },
    userName: { type: String },
    userPic: { type: String }
});

//implementacion del modelo itinerary
const itinerarySchema = new mongoose.Schema ({
    title: { type: String, required: true },
    img: { type: String, required: true },
    activities: { type : [{ name: { type: String }, img: { type: String } }] },
    authorName: { type: String, required: true },
    authorPic: { type: String, required: true },
    price: { type: Number, required: true, min: 1, max: 5 },
    duration: { type: Number, required: true, min: 1 },
    likes: { type: Number, default: 0 },
    hashtags: { type: [String] },
    comments: { type : [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
        text: { type: String },
        userName: { type: String },
        userPic: { type: String } }] },
    usersLike: { type: [String] },
    cityId: { type: mongoose.Schema.Types.ObjectId, required: true }
}); 

module.exports = mongoose.model ("itinerary", itinerarySchema);