const { User , response } = require("../userModule")

//Agregar un nuevo usuario
const createUser = async (req, res = response) => {
    let body = req.body;

    const newUser = new User({
        firstName: body.firstName,
        lastName: body.lastName,
        mail: body.mail,
        password: body.password,
        userPic: body.userPic,
        country: body.country,
    });

    //posible mejora, revisar que no exista antes de agregarlo

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