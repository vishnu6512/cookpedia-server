const express = require("express");
require("dotenv").config();
const cors = require("cors");
require("./config/connection");
const router = require("./routes/router")

const cookpediaServer = express();
cookpediaServer.use(cors());
cookpediaServer.use(express.json());
cookpediaServer.use(router)

const PORT = process.env.PORT || 3000;
cookpediaServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

cookpediaServer.get("/", (req, res) => {
    res.status(200).send(`<h1>CookpediaServer is running </h1>`);
});



