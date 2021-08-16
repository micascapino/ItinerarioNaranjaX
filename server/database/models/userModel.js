const mongoose = require("mongoose");

//implementacion del modelo user
const userSchema = new mongoose.Schema ({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    mail: { type: String, required: true },
    password: { type: String, required: true },
    userPic: { type: String},
    country: { type: String}
}); 

module.exports = mongoose.model ("user", userSchema);