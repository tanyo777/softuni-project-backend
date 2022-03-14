const authRouter = require("express").Router();
const loginController = require("../controllers/LoginController");
const registerController = require("../controllers/RegisterController");



authRouter.post("/login", loginController);


authRouter.post("/register", registerController);


module.exports = authRouter;
