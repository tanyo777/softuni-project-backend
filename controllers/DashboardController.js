const jwt = require("jsonwebtoken");
const { getFullDataForUser } = require("../services/userService");

const dashboardController = async (req, res) => {
    const token = req.headers.token;
    try {
        const verifiedUser = await jwt.verify(token, process.env.jwtPrivateKey);
        const userData = await getFullDataForUser(verifiedUser.username);
        
        res.status = 200;
        res.json({ user: userData });
    } catch(err) {
        res.json({ error: err.message});
    }
   
}


module.exports = {
    dashboardController
};