const { loginUser } = require("../services/userService");
const { validationResult } = require("express-validator");

const loginController = async (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);

    
    try {

        // if there are errors from the express-validator
        if(errors.length) {
            errors.errors.forEach(error => {
                throw Error(error.msg);
            })
        }

        const token = await loginUser(email, password);
        res.json({ token });
    } catch(err) {
        res.json({ error: err.message });
    }

}


module.exports = loginController;