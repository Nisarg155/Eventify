const express = require("express");
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const cors = require('cors');
const UserDetails = require('./modals/UserDetails');
const Event = require('./modals/Event');
const Manager = require('./modals/Manager');

const PORT = process.env.PORT || 5000;
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DATABASE_URL).then(
    (connection) => {
        console.log('MongoDB Connected');
    },
)
    .catch(err => console.log(err))

app.get("/", (req, res) => {

    user.save();
    res.json({
        message: "Welcome to the DB!",
    });
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});





