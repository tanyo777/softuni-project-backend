const isAuthenticated = (req, res, next) => {
    const token = req.headers.token;
    if(token) {
        next();
    } else {
        res.status(403).send({ msg: "You dont't have access!Please login first!" });
    }

}

module.exports = {
    isAuthenticated
}