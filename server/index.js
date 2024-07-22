const express = require("express");
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
dotenv.config();
const app = express();


mongoose.connect(process.env.DATABASE_URL).then(
    () => console.log('MongoDB Connected'),
)
    .catch(err => console.log(err))

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to the DB!",
    });
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});




