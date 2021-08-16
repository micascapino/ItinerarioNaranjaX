const itineraryRepository = require('../../../repositories/itineraryRepository');

const checkUser = async (req, res) => {
    try {
        const itinerary = await itineraryRepository.getItineraryById(req.params.id);
        if (!itinerary) {
            res.status(404).json({
                success: false,
                message: ("El itinerario no existe.")
            });
        }
        return res.status(200).json({
            success: true,
            response: {
                arrayOwnerCheck: itinerary.comments.filter(comment => comment.userId.toString() === req.user._id.toString()).map(comment => comment._id),
                likedCheck: itinerary.usersLike.includes(req.user._id.toString())
            }
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error
        });
    }
}

module.exports = checkUser;