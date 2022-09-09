const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const cookieParser = require('cookie-parser');

const app = express();

dotenv.config({ path: "./config.env" });
require("./db/conn");

//we are getting data in the form of json so inorder to make our app understand we will do this and also we've to use the middleware
//converting json data into object by using express.
app.use(express.json());

//linking router file to make it easier
app.use(require("./router/auth"));

app.use(cookieParser());

const PORT = process.env.PORT;

app.get("/login", (req, res) => {
    res.send("Hello login");
});


app.post("/add-product", async(req, res) => {
    let prodlist = new Prodlist(req.body);
    let result = await prodlist.save();
    res.send(result);
});

app.listen(PORT, (req, res) => {
    console.log("Server is up and running on " + PORT);
});