const express = require("express");
const configureApp = require("./config/configExpress");
require('dotenv').config();


async function main() {
    try {
        const app = express();
        await configureApp(app);
        app.listen(process.env.PORT || 8080);
        console.log("Connected to MongoDB Atlas");
        console.log(`Server started on port: ${process.env.PORT ? process.env.PORT : 8080}`)
    } catch(err) {
        console.log(err.message);
        process.exit(1);
    }

}



main();