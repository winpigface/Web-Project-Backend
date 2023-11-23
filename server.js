const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session')
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

app.use(session({
    secret: 'HWEWEW',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: false,
        httpOnly: true,
        maxAge: 1*60*(60*1000) }
  }))

require('dotenv').config()
global.__basedir = __dirname;
var corsOptions = {
origin: "*"
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
// //Check
app.get("/", (req, res) => {

    res.json({ message: "Welcome to my Website." });
});

require("./app/router/user.routes")(app)
require("./app/router/admin.routes")(app)



//Port
PORT = 3000
const server = app.listen(process.env.PORT || PORT, () => {

    console.log(`Server is running on port ${PORT}`);
});

