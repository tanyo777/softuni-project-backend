const mongoose = require("mongoose");
require("dotenv").config();


function dbConnector() {
    return mongoose.connect(process.env.MONGODB_ATLAS_URL)
}

module.exports = dbConnector