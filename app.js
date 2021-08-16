const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const passport = require('passport');

const cors = require("cors");
app.use (express.json ());
app.use (
	express.urlencoded ({
		extended: true
	})
);
app.use(cors()); 

//credenciales de acceso a Mongo estan en otro archivo para poder ignorarlas en git
const db = require("./keys.js").mongoURI;

//conexion a la base
const mongoose = require("mongoose");
mongoose.connect(db, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
	.then(() => console.log ("Conexión a MongoDB establecida"))
	.catch(err => console.log (err));

//uso de los modelos y sus rutas de acceso
app.use("/api", require ("./routes/cities"));
app.use("/api", require ("./routes/itineraries"));
app.use('/api/checkuser/:id', passport.authenticate('jwt', { session: false }), require('./controllers/itineraryController/itineraryController').checkUser);
app.use('/api/like/:id', passport.authenticate('jwt', { session: false }), require('./controllers/itineraryController/itineraryController').like);
app.use("/api/user", require ("./routes/users"));

module.exports = { port, app };