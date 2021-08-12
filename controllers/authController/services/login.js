const key = require ("../../../keys");
const bcrypt = require("bcrypt");
const jwt = require ("jsonwebtoken"); 
const { validationResult } = require('express-validator');

const login = async(req, res = response) => {
    
    const errores = validationResult(req);
    if( !errores.isEmpty() ){
        return res.status(400).json({ errores: errores.array() });
    };

    try{
        const { mail, password } = req.body;
        //si el usuario existe, compare las contraseñas con la función de comparación de bycript

        let user = await userRepository.getUserByMail(mail);
        //si no encuentra al usuario da un error
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe'
            });
        }

        //Revisa la contraseña
        const correctPass = bcrypt.compare(password, user.password);
        if (!correctPass) {
            return res.status(401).json({
                ok: false,
                msg: 'La contraseña es incorrecta'
            });
        }

        const payload = {
            id: user.id,
            username: user.username,
            avatarPicture: user.avatarPicture
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
                        token: token
                    });
                }
            }
        ); 
    }
    catch(error){


    }


}

module.exports = { login } 