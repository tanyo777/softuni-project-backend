const jwt = require("jsonwebtoken");


const isAuthenticated = async (req, res, next) => {
    const token = req.headers.token;
    const result = await jwt.verify(token, process.env.jwtPrivateKey);

    if(token && result.email) {
        next();
    } else {
        res.status(403).send({ msg: "You dont't have access!Please login first!" });
    }

}

module.exports = {
    isAuthenticated
}