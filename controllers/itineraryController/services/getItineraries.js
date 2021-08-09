const { Itinerary,  response  } = require('../itineraryModule')
const itineraryRepository  = require('../../../repositories/itineraryRepository')
const itineraryModel = require('../../../database/models/itineraryModel')

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

module.exports = { getItineraries }