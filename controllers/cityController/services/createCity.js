 const { City , response } = require("../cityModule")

//Agregar nueva ciudad
const createCity = async (req, res = response) => {
    let body = req.body;

    //verifica que no exista antes de ingresarlo
    const city = await City.findOne({"name": body.name},(err,user) => {
        if (user){
            return res.status(400).json({
                ok:false,
                message:"Esta ciudad ya fue creada"
            });
        }

    });

    const newCity = new City({
        name: body.name,
        country: body.country,
        phrase: body.phrase,
        img: body.img
    });

    await newCity.save( (err, cityDB) => {
        if (err){
            return res.status(500).json({
                ok:false,
                message:"Error interno del servidor",
                err
            });
        }
        else{
            //hago una variable city en base a lo que guarde en la base de datos
            const city = cityDB

            return res.status(201).json({
                ok:true,
                message:"La ciudad se creo correctamente",
                city
            });
        }
    })
}

module.exports = { createCity };