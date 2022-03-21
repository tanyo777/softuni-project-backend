const dbConnector = require("./dbConnector");
const cors = require("cors");
const express = require("express");
const authRouter = require("../routers/authRouter");
const { projectRouter } = require("../routers/projectRouter");


async function configureApp(app) {

    // connect to db
    await dbConnector();
    
    // middlewares
    app.use(cors());
    app.use(express.json());
    
    // routers
    app.use("/", authRouter);
    app.use("/", projectRouter)
}



module.exports = configureApp