const { response  } = require("../cityModule");
const cityRepository  = require("../../../repositories/cityRepository");

const getCities = async(req,  res = response) =>  { 
    try {
        const data  = await cityRepository.getAll();
        const count = await cityRepository.count();  
        res.status(200).json({
            success: true,
            message:  "Ciudades:",
            response: data,
            total: count
        });  
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message:  "Error Interno del Servidor",
            err: error
        });
    }
};

const getCity = async(req,  res = response) =>  { 
    const id  = req.params.id;
    
    try {
        const data  = await cityRepository.getOne(id);
        if(!data){
            return  res.status(401).json({
                success: false,
                message: "No se encuentra esta ciudad en la base de datos",
            });
        }
        res.status(200).json({
            success: true,
            message:  "Ciudad:",
            response: data,
        });  
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message:  "Error Interno del Servidor",
            err: error
        });
    }
};

const getCityByQuery = async(req,  res = response) =>  { 
    const name  = req.query.name;
    try {
        const data  = await cityRepository.getCityByName(name);

        if(!data){
            return  res.status(401).json({
                success: false,
                message: "No se encuentra esta ciudad en la base de datos",
            });
        }
        return res.status(200).json({
            success: true,
            message:  "Ciudad:",
            response: data,
        });  
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message:  "Error Interno del Servidor",
            err: error
        });
    }
};

module.exports = { getCities, getCity, getCityByQuery };