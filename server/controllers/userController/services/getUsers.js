const { response  } = require("../userModule");
const userRepository  = require("../../../repositories/userRepository");

/* SOLO USO INTERNO EN POSTMAN */
const getUsers = async (req, res = response) => {
    try{
        const usersDB = await userRepository.getAll();
        const count = await userRepository.count();
    
        if(!usersDB){
            return res.status(401).json({
                success:false,
                message: "No hay usuarios en la base de datos"
            });
        }
        res.status(200).json({
            success:true,
            message: "Usuarios:",
            response: usersDB,
            total:count
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

const signinls = async(req, res = response) => {
    try{
        res.status(200).json({
            success: true,
            response: {
                userPic: req.user.userPic, 
                firstName: req.user.firstName   
            }
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            error
        });
    }
};

module.exports = { getUsers , signinls };