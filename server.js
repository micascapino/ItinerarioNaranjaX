const { app , port } = require("./app");
require('./passport');

//confirmacion de conexion en el puerto especificado
app.listen (port, () => {
	console.log ("El servidor se está ejecutando en el port " + port);
});
