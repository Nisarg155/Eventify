const express = require("express");
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const cors = require('cors');
// const UserDetails = require('./modals/UserDetails');
// const Event = require('./modals/Event');
// const Manager = require('./modals/Organization');
const morgan = require('morgan');
const {protect} = require("./auth/auth");
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

mongoose.connect(process.env.DATABASE_URL).then(
    (connection) => {
        console.log('MongoDB Connected');
    },
)
    .catch(err => console.log(err))


app.use(cors());
// request can send json to server
app.use(express.json());
// logs all the request to console
app.use(morgan('dev'));


// default route to check if server is running
app.get("/", (req, res) => {

    res.json({
        message: "Welcome to the DB!",
    });
})

//protected router
app.use("/api",protect);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});





