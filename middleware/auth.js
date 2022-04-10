const jwt = require("jsonwebtoken");


const isAuthenticated = async (req, res, next) => {
    const token = req.headers.token;

    if(!token) {
        res.status(403).json({ msg: "You dont't have access!Please login first!" });
    } else {
        const result = await jwt.verify(token, process.env.jwtPrivateKey);
    
        if(token && result.email) {
            next();
        } 
    }
}

module.exports = {
    isAuthenticated
}