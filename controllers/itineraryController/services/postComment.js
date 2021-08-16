const { response } = require("../itineraryModule");
const itineraryRepository  = require("../../../repositories/itineraryRepository");

//Agregar nueva ciudad
const postComment = async (req, res = response) => {
    const user = req.user;
    const id = req.params.id;
    const text = req.body.text;
    let commentsId = [];

    try{
        const itineraryDB = await itineraryRepository.getItineraryById(id);
        if (!itineraryDB) {
            return res.status(404).json({
                success: false,
                message: "No se encontro el itinerario",
            });
        }
        let {comments} = itineraryDB;

        //armar el comentario con los datos
        var newComment = {
            userId: user._id,
            text: text,
            userName: user.firstName,
            userPic: user.userPic
        };

        comments.push(newComment);
        comments.forEach((comment) => {
            if (comment.userId.toString().trim() == req.user._id.toString().trim()) {
                commentsId.push(comment._id);
            }
        });

        itineraryRepository.postComments(comments,id);

        return res.status(200).json({
            success:true,
            message:"El comentario se agrego correctamente",
            response: {
                response: comments,
                arrayOwnerCheck: commentsId
            }
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error interno del servidor",
            error
        });
    }
};

module.exports = { postComment };