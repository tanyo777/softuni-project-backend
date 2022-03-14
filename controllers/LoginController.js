

const loginController = (req, res) => {
    console.log(req.body);
    res.send("Login Controller");
}


module.exports = loginController;