const express = require("express");
const app = express();
const port = process.env.PORT || 4000;

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
app.use("/itineraries", require ("./routes/itineraries"));
app.use("/users", require ("./routes/users"));

module.exports = { port, app };