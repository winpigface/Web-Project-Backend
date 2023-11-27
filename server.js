const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const moment = require('moment')
require('dotenv').config()
global.__basedir = __dirname;
var corsOptions = {
origin: "*",
credentials: true,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
// //Check
app.get("/", (req, res) => {
    res.json({ message: "Welcome to my Website." });
    console.log( moment().format("HH:mm"));
});

require("./app/router/user.routes")(app)
require("./app/router/admin.routes")(app)



//Port
PORT = 3000
const server = app.listen(process.env.PORT || PORT, () => {

    console.log(`Server is running on port ${PORT}`);
});


