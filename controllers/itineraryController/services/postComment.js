const { Itinerary , response } = require("../itineraryModule")
const { validationResult } = require('express-validator');
const itineraryRepository  = require('../../../repositories/itineraryRepository')

//Agregar nueva ciudad
const postComment = async (req, res = response) => {
    const itineraryId = req.params.id;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try{
        //buscar el itinerario
        const itinerary = itineraryRepository.getItineraryById(itineraryId);

        const newComment = new itinerary.comments({
            userId: req.params.userId,
            text: req.body.text,
            userName: req.params.userName,
            userPic: req.params.userPic,
        });

        Itinerary.comments.push(newComment);
        return res.status(201).json({
            success:true,
            message:"El comentario se agrego correctamente",
            newComment
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error interno del servidor",
            err
        });
    }
}

module.exports = { postComment };