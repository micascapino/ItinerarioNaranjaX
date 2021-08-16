const { Itinerary,  response  } = require('../itineraryModule')
const itineraryRepository  = require('../../../repositories/itineraryRepository')
const itineraryModel = require('../../../database/models/itineraryModel')
const cityRepository  = require('../../../repositories/cityRepository')

const getItineraries = async (req, res = response) => {
    try{
        const itinerariesDB = await itineraryRepository.getAll();
        if (itinerariesDB.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'No hay registros en la base de datos'
            });
        }

        const count = await itineraryRepository.count();
   
        res.status(200).json({
            success:true,
            message: "Itinerarios:",
            response: itinerariesDB,
            total:count
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"Error interno del servidor",
            err,error
        })
    }
}

//pendiente de solucion, la base no lo muestra actualmente.
const getItineraryByName = async(req,  res = response) =>  { 
    try {
        const cityId = req.params.cityId;
        const itineraryFound = await itineraryRepository.getItineraryByCityId(cityId);
        if (itineraryFound.length == 0){
            return res.status(400).json({
                success: false,
                message: "No se encuentra itinerario para esta ciudad."
            })  
        }
        res.status(200).json({
            success: true,
            message: "Itinerarios",
            response: itineraryFound,
        })  
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message:  "Error Interno del Servidor",
            err: error
        })
    }
}

module.exports = { getItineraries, getItineraryByName }