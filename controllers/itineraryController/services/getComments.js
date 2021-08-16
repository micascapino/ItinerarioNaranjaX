const { response  } = require("../itineraryModule");
const itineraryRepository  = require("../../../repositories/itineraryRepository");

//ver
const getCommentsByItinerary = async (req, res = response) => {
    const id = req.params.id;
    try{
    //voy a necesitar traer un itinerario por id que entra por parametro
        const itineraryFound = await itineraryRepository.getItineraryById(id);
    
        if(!itineraryFound){
            return res.status(401).json({
                success:false,
                message: "No encuentro el itinerario"
            });
        }

        res.status(200).json({
            success:true,
            message: "Comentarios:",
            response: itineraryFound
        });
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"Error interno del servidor",
            error
        });
    }
};

module.exports = { getCommentsByItinerary };