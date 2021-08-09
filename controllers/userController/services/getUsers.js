const { User,  response  } = require('../userModule')
const userRepository  = require('../../../repositories/userRepository')
const userModel = require('../../../database/models/userModel')

const getUsers = async (req, res = response) => {
    try{
        const usersDB = await userRepository.getAll();
        const count = await userRepository.count();
    
        if(!usersDB){
            return res.status(401).json({
                ok:false,
                message: "No hay usuarios en la base de datos"
            })
        }
        res.status(200).json({
            ok:true,
            message: "Usuarios:",
            users: usersDB,
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

module.exports = { getUsers }