const express = require("express");
const app = express();
// eslint-disable-next-line no-undef
const port = process.env.PORT || 5000;

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

//uso del modelo cities y sus rutas de acceso
app.use("/cities", require ("./routes/cities"));
app.use("/itineraries", require ("./routes/itineraries"));

//confirmacion de conexion en el puerto especificado
app.listen (port, () => {
	console.log ("El servidor se está ejecutando en el port " + port);
});
