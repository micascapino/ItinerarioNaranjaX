const { City,  response  } = require('../cityModule')
const cityRepository  = require('../../../repositories/cityRepository')
const cityModel = require('../../../database/models/cityModel')
const itineraryRepository  = require('../../../repositories/itineraryRepository')

const getCities = async(req,  res = response) =>  { 
    try {
        const citiesDb  = await cityRepository.getAll();
        const count = await cityRepository.count();  

        if(!citiesDb){
            return  res.status(401).json({
                ok: false,
                message: "No hay ciudades en la base de datos",
            })
        }
        res.status(200).json({
            ok: true,
            message:  "Ciudades:",
            cities: citiesDb,
            total: count
        })  
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            message:  "Error Interno del Servidor",
            err: error
        })
    }
}

//no funcional por el momento
const getCity = async(req,  res = response) =>  { 
    const id  = req.params.id;
    
    try {
        const cityDB  = await cityRepository.getOne(id);
        if(!cityDB){
            return  res.status(401).json({
                ok: false,
                message: "No se encuentra esta ciudad en la base de datos",
            })
        }
        res.status(200).json({
            ok: true,
            message:  "Ciudad:",
            city: cityDB,
        })  
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            message:  "Error Interno del Servidor",
            err: error
        })
    }
}

//no funcional por el momento
const getCityByQuery = async(req,  res = response) =>  { 
    const name  = req.query.name;
    try {
        const cityDB  = await cityRepository.getCityByName(name);

        if(!cityDB){
            return  res.status(401).json({
                ok: false,
                message: "No se encuentra esta ciudad en la base de datos",
            })
        }
        return res.status(200).json({
            ok: true,
            message:  "Ciudad:",
            cities: cityDB,
        })  
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            message:  "Error Interno del Servidor",
            err: error
        })
    }
}

module.exports = { getCities, getCity, getCityByQuery };