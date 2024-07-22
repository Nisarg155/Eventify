const express = require("express");
const dotenv = require('dotenv')
const mongoose = require('mongoose');

dotenv.config();
const app = express();


mongoose.connect(process.env.DATABASE_URL).then(
    () => console.log('MongoDB Connected'),
)
    .catch(err => console.log(err))

app.get("/", (req, res) => {
    res.render("hello this is my node app");
})





