const { createUser } = require("../services/userService");
const { validationResult } = require("express-validator");
const speakeasy = require("speakeasy");
const jwt = require("jsonwebtoken");
const qrcode = require("qrcode");

const registerController = async (req, res) => {
    const { fullName, username, email, password, confirmPassword } = req.body;
    const errors = validationResult(req);

    try {

        const secret = speakeasy.generateSecret();

        const otpauth_url = secret.otpauth_url;

        // if there are errors from the express-validator
        if (errors.length) {
            errors.errors.forEach(error => {
                throw Error(error.msg);
            })
        }
        // create user
        const token = await createUser(fullName, username, email, password, confirmPassword, secret, otpauth_url);
        res.status = 200;
        res.json({ token })
    } catch (err) {
        res.status = 400;
        res.json({ error: err.message });
    }
}


const twoFa = async (req, res) => {
    const { secretKey, token } = req.body;

    try {
        const user = await jwt.verify(token, process.env.jwtPrivateKey);
        const verified = speakeasy.totp.verify({
            secret: user.secret,
            encoding: 'base32',
            token: secretKey
        })
        res.json({ verified });
    } catch (err) {
        res.json({ error: err.message });
    }
}


const qrcodeData = async (req, res) => {

    const { otpauth_url } = req.body;
    console.log(req.body);

    const qr = await qrcode.toDataURL(otpauth_url)
    res.json({ qrcode: qr});
}


module.exports = { registerController, twoFa, qrcodeData };