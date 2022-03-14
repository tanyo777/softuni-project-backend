const { createUser } = require("../services/userService");


const registerController = async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    try {
        const user = await createUser(username, email, password, confirmPassword);
        res.json(user);
    } catch(err) {
        err.errors.forEach(err => console.log(err.msg));
    }
    

}


module.exports = registerController;