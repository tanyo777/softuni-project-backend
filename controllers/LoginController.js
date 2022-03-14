const { loginUser } = require("../services/userService");

const loginController = async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await loginUser(email, password);
        res.json({ token });
    } catch(err) {
        res.json({ error: err.message });
    }

}


module.exports = loginController;