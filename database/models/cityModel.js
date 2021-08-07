const mongoose = require("mongoose");

//implementacion del modelo city
const citySchema = new mongoose.Schema ({
	name: { type: String, required: true },
	country: { type: String, required: true },
	phrase: { type: String, required: true },
	img: { type: String, required: true }
}); 

module.exports = mongoose.model ("city", citySchema);