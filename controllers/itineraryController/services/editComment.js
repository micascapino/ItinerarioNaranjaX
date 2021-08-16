const itineraryRepository = require('../../../repositories/itineraryRepository');

const editComment = async (req, res) => {
    try {
        const { user } = req;
        //id del comentario
        const { id } = req.params;
        const { text } = req.body;

        const itinerary = await itineraryRepository.getbyCommentId(commentId,user._id)
        
        if(!itinerary){
            return res.status(404).json({
                success:false,
                response:("No se encontro el comentario")
            });   
        }
        
        itineraryDB = await itineraryRepository.editComment(id, text);
        
        return res.status(200).json({
            success:true,
            response: itineraryDB.comments
        });
    
    }
    catch (error) {
        return res.status(500).json({
            success:false,
            error
        });   
    }
};

module.exports = editComment;