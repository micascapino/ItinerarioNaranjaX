const { User , response } = require("../userModule")
const userRepository  = require('../../../repositories/userRepository')
const bcrypt = require("bcrypt");
const saltRounds  = 12;

//Agregar un nuevo usuario
const createUser = async (req, res = response) => {
    let body = req.body;

    //verifica que no exista antes de ingresarlo
    const userDB = await User.findOne({"mail": body.mail},(err,user) => {
        if (user){
            return res.status(400).json({
                ok:false,
                message:"El mail ya esta registrado con otro usuario"
            });
        }
    });

    const newUser = new User({
        firstName: body.firstName,
        lastName: body.lastName,
        mail: body.mail,
        password: await bcrypt.hash(body.password,saltRounds),
        userPic: body.userPic,
        country: body.country,
    });
    
    await newUser.save( (err, userDB) => {
        if (err){
            return res.status(500).json({
                ok:false,
                message:"Error interno del servidor",
                err
            });
        }
        else{
            //hago una variable user en base a lo que guarde en la base de datos
            const user = userDB

            return res.status(201).json({
                ok:true,
                message:"El usuario se creo correctamente",
                user
            });
        }
    })
}

module.exports = { createUser };