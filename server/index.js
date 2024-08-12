const express = require("express");
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const {protect} = require("./auth/auth");
const loginRouter = require('./router/login');
const PORT = process.env.PORT || 5000;
const app = express();
dotenv.config();
const mailgun = require("mailgun-js");
const DOMAIN = "mailg.csi-ddu.tech";

// const mg = mailgun({apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN});
// const data = {
//     from: "CSI DDU <ce_csi@ddu.ac.in>",
//     to: "amlaninisarg15@gmail.com",
//     subject: "Hello",
//     text: "Testing some Mailgun awesomness!"
// };
// mg.messages().send(data, function (error, body) {
//     console.log(body);
// });

// const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY});

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

// for login router
app.use("/api/login",loginRouter);
//protected router
app.use("/api",protect);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});





