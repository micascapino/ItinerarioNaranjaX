const { User , response } = require("../userModule")
const userRepository  = require('../../../repositories/userRepository')
const bcrypt = require("bcrypt");
const saltRounds  = 12;
const { validationResult } = require('express-validator');

//Agregar un nuevo usuario
const createUser = async (req, res = response) => {
    let body = req.body;
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try{
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
            if (userDB){
                return res.status(201).json({
                    ok:true,
                    message:"El usuario se creo correctamente",
                    userDB
                });
            }
        })
    }
    catch(error){
        return res.status(500).json({
            ok:false,
            message:"Error interno del servidor",
            err
        });
    }
}

module.exports = { createUser };