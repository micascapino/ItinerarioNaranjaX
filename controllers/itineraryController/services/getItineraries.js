const { Itinerary,  response  } = require('../itineraryModule')
const itineraryRepository  = require('../../../repositories/itineraryRepository')
const itineraryModel = require('../../../database/models/itineraryModel')
const cityRepository  = require('../../../repositories/cityRepository')

const getItineraries = async (req, res = response) => {
    try{
        const itinerariesDB = await itineraryRepository.getAll();
        const count = await itineraryRepository.count();
    
        if(!itinerariesDB){
            return res.status(401).json({
                ok:false,
                message: "No hay itinerarios en la base de datos"
            })
        }
        res.status(200).json({
            ok:true,
            message: "Itinerarios:",
            itineraries: itinerariesDB,
            total:count
        })
    }
    catch(error){
        res.status(500).json({
            ok:false,
            message:"Error interno del servidor",
            err,error
        })
    }
}

const getItineraryByName = async(req,  res = response) =>  { 
    const cityName  = req.query.name;
    try {
        const cityDB  = await cityRepository.getCityByName(cityName);

        if(!cityDB){
            return  res.status(401).json({
                ok: false,
                message: "No se encuentra esta ciudad en la base de datos",
            })
        }
        //consigo el id de la ciudad para buscar el itinerario
        const actualId = cityDB._id
        const itineraryFound = await itineraryRepository.getItineraryByCityId(actualId);

        return res.status(200).json({
            ok: true,
            message: `Itinerario para {cityName}`,
            itinerary: itineraryFound,
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

module.exports = { getItineraries, getItineraryByName }