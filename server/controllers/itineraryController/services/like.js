const itineraryRepository = require("../../../repositories/itineraryRepository");

const like = async (req, res) => {
    try {
        const itinerary = await itineraryRepository.getItineraryById(req.params.id);
        if (!itinerary) {
            return res.status(404).json({
                success:false,
                response: ("No existe el itinerario")
            });  
        }
        const userId = req.user._id.toString();
        if (itinerary.usersLike.includes(userId)) {
            // quitar like
            itinerary.usersLike = itinerary.usersLike.filter(userLike => userLike !== userId);
        } else {
            // agregar like
            itinerary.usersLike = [...itinerary.usersLike, userId];
        }
        itinerary.likes = itinerary.usersLike.length;
        await itinerary.save();
        return res.status(200).json({
            success:true,
            response: {
                likes: itinerary.likes,
                liked: itinerary.usersLike.includes(userId)
            }
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            error
        });
    }
};

module.exports = like;