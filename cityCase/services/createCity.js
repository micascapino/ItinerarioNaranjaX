const { City , response } = require("../cityModule")
// comentado para posible mejora despues
//const cityRepository  = require('../../repositories/cityRepository')

//Agregar nueva ciudad
const createCity = async (req, res = response) => {
    let body = req.body;

    const newCity = new City({
        name: body.name,
        country: body.country,
        phrase: body.phrase,
        img: body.img
    });

    //posible mejora, revisar que no exista antes de agregarlo

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