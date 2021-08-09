const { City,  response  } = require('../cityModule')
const cityRepository  = require('../../../repositories/cityRepository')
const cityModel = require('../../../database/models/cityModel')

const getCities = async(req,  res = response) =>  { 
    try {
        //data = cityDb
        const data  = await cityRepository.getAll();
        const count = await cityRepository.count();  

        if(!data){
            return  res.status(401).json({
                ok: false,
                message: "No hay ciudades en la base de datos",
            })
        }
        res.status(200).json({
            ok: true,
            message:  "Ciudades:",
            response: data,
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
        const data  = await cityRepository.getOne(id);
        if(!data){
            return  res.status(401).json({
                ok: false,
                message: "No se encuentra esta ciudad en la base de datos",
            })
        }
        res.status(200).json({
            ok: true,
            message:  "Ciudad:",
            response: data,
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
        const data  = await cityRepository.getCityByName(name);

        if(!data){
            return  res.status(401).json({
                ok: false,
                message: "No se encuentra esta ciudad en la base de datos",
            })
        }
        return res.status(200).json({
            ok: true,
            message:  "Ciudad:",
            response: data,
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