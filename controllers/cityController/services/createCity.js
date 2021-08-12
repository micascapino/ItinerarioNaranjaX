const { City , response } = require("../cityModule")
const { validationResult } = require('express-validator');

//Agregar nueva ciudad
const createCity = async (req, res = response) => {
    let body = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try{
        //verifica que no exista antes de ingresarlo
        const city = await City.findOne({"name": body.name},(err,user) => {
            if (user){
                return res.status(400).json({
                    success:false,
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
            if (cityDB){
                return res.status(201).json({
                    success:true,
                    message:"La ciudad se creo correctamente",
                    cityDB
                });
            }
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error interno del servidor",
            err
        });
    }
}

module.exports = { createCity };