const dbConnector = require("./dbConnector");
const cors = require("cors");
const express = require("express");
const authRouter = require("../routers/authRouter");


async function configureApp(app) {

    // connect to db
    await dbConnector();
    
    // middlewares
    app.use(cors());
    app.use(express.json());
    
    // routers
    app.use("/", authRouter)
}



module.exports = configureApp