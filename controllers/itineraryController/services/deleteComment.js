const itineraryRepository = require('../../../repositories/itineraryRepository');

const deleteComment = async (req, res) => {
    try {
        const { id: commentId } = req.params;
        const itinerary = await itineraryRepository.getbyCommentId(commentId,req.user._id)
        if(!itinerary){
            return res.status(404).json({
                success:false,
                response:("No se encontro el Itinerario")}
            );   
        }
        itinerary.comments.id(commentId).remove();

        await itinerary.save();

        return res.status(200).json({
            success:true,
            response: itinerary.comments
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error
        });
    }
};

module.exports = deleteComment;