const { Router } = require("../controllers/userController/userModule");
const router = new Router();
const { get, create } = require("../controllers/userController/userController");

//traer todas los usuarios
router.get("/users", get.getUsers);
//crear un nuevo usuario
router.post("/register", create.createUser);

module.exports = router;