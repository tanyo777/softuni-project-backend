const authRouter = require("express").Router();
const loginController = require("../controllers/LoginController");
const {registerController, twoFa, qrcodeData} = require("../controllers/RegisterController");
const { body } = require("express-validator");
const { dashboardController } = require("../controllers/DashboardController");
const { isAuthenticated } = require("../middleware/auth");


// login route
authRouter.post("/login", 
body("email").isEmail().withMessage("The email is unvalid!"),
loginController);

// register route
authRouter.post("/register", 
body("email").isEmail().withMessage("The email is unvalid!"),
body("password").isLength({ min: 6}).withMessage("Password must be atleast 6 characters!"),
registerController);


authRouter.post('/verify', twoFa);
authRouter.post("/qrcode", isAuthenticated, qrcodeData);

// dashboard route
authRouter.get("/dashboard", isAuthenticated, dashboardController);




module.exports = authRouter;
