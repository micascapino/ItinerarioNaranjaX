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
                success:false,
                message: "No hay itinerarios en la base de datos"
            })
        }
        res.status(200).json({
            success:true,
            message: "Itinerarios:",
            itineraries: itinerariesDB,
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
        if (!itineraryFound){
            return res.status(400).json({
                success: false,
                message: "No se encuentra itinerario para esta ciudad."
            })  
        }
        return res.status(200).json({
            success: true,
            message: `Itinerario para {cityName}`,
            itinerary: itineraryFound,
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

const getItineraryById = async(req,  res = response) =>  { 
    const id  = req.params.id;
    try {
        //recibo el nombre de una ciudad, por ende busco esa ciudad en la base de datos.
        const itinerary  = await itineraryRepository.getItineraryById(id);

        if(!itinerary){
            return  res.status(401).json({
                success: false,
                message: "No se encuentra este itinerario en la base de datos",
            })
        }
        console.log(itinerary)
        return res.status(200).json({
            success: true,
            message: `Itinerario`,
            itinerary: itinerary,
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


//ver
const getCommentsByItinerary = async (req, res = response) => {
    const id = req.params.id
    try{
        //voy a necesitar traer un itinerario por id que entra por parametro
        const itineraryFound = await itineraryRepository.getItineraryById(id);
    
        if(!itineraryFound){
            return res.status(401).json({
                success:false,
                message: "No encuentro el itinerario"
            })
        }
        console.log(itineraryFound);

        res.status(200).json({
            success:true,
            message: "Comentarios:",
            itineraryFound
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


module.exports = { getItineraries, getItineraryByName, getCommentsByItinerary }