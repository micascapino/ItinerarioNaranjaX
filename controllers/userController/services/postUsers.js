const { User, response } = require("../userModule");
const userRepository = require("../../../repositories/userRepository");
const bcrypt = require("bcrypt");
const saltRounds  = 12;
const { validationResult } = require("express-validator");
const key = require ("../../../keys");
const jwt = require ("jsonwebtoken"); 

//REGISTRAR un nuevo usuario
const signUp = async (req, res = response) => {
    const body = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try{
    //verifica que no exista antes de ingresarlo
        const userDB = await userRepository.getUserByMail(body.email);

        if (userDB){
            return res.status(400).json({
                success:false,
                message:"El mail ya esta registrado con otro usuario"
            });
        }
        
        const newUser = new User({
            firstName: body.firstName,
            lastName: body.lastName,
            mail: body.email,
            password: await bcrypt.hash(body.password,saltRounds),
            userPic: body.userPic,
            country: body.country,
        });
        
        await newUser.save( (error, userDB) => {
            if (userDB){
                return res.status(201).json({
                    success: true,
                    response: {
                        message: "Signed up!",
                        firstName: userDB.firstName,
                        userPic: userDB.userPic,
                    },
                });
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


const login = async(req, res = response) => {
    
    const errores = validationResult(req);
    if( !errores.isEmpty() ){
        return res.status(400).json({ errores: errores.array() });
    }

    try{
        const mail = req.body.email;
        const password = req.body.password;
        //si el usuario existe, compare las contraseñas con la función de comparación de bycript
        let userDB = await userRepository.getUserByMail(mail);
        //si no encuentra al usuario da un error
        if (!userDB) {
            return res.status(400).json({
                success: false,
                msg: "El usuario no existe"
            });
        }

        //Revisa la contraseña
        let correctPass = await bcrypt.compare(password, userDB.password);
        
        if (!correctPass) {
            return res.status(401).json({
                success: false,
                msg: "La contraseña es incorrecta"
            });
        }

        const payload = {
            id: userDB.id,
            username: userDB.firstName,
            avatarPicture: userDB.userPic
        };

        const options = {expiresIn: 2592000};

        jwt.sign(
            payload,
            key.secretOrKey,
            options,
            (err, token) => {
                if(err){
                    res.json({
                        success: false,
                        token: "There was an error"
                    });
                }else {
                    res.json({
                        success: true,
                        response: {
                            message: "Logged in",
                            token,
                            firstName: userDB.firstName,
                            userPic: userDB.userPic,
                        },
                    });
                }
            }
        ); 
    }
    catch(error){
        return res.json({
            success: false,
            error
        });
    }
};

module.exports = { signUp, login };