const { createUser } = require("../services/userService");
const { validationResult } = require("express-validator");

const registerController = async (req, res) => {
    const { fullName, username, email, password, confirmPassword } = req.body;
    const errors = validationResult(req);
    
    try {

        // if there are errors from the express-validator
        if(errors.length) {
            errors.errors.forEach(error => {
                throw Error(error.msg);
            })
        }
        // create user
        const token = await createUser(fullName, username, email, password, confirmPassword);
        res.status = 200;
        res.json({ token })
    } catch(err) {
        res.status = 400;
        res.json({error: err.message});
    }
}


module.exports = registerController;