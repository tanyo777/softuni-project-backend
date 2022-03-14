const jwt = require("jsonwebtoken");


const dashboardController = async (req, res) => {
    const token = req.headers.token;
    try {
        const verifiedUser = await jwt.verify(token, process.env.jwtPrivateKey);
        res.status = 200;
        res.json({ user: verifiedUser });
    } catch(err) {
        res.json({ error: err.message});
    }
   
}


module.exports = {
    dashboardController
};