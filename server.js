const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const morgan = require("morgan");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
    client: "pg",
    connection: process.env.POSTGRES_URI
});
// .then(() => {
//     console.log("db connected");
// })
// .catch(e => console.log("error connecting", e));

console.log("host", process.env.POSTGRES_URI);

const app = express();
const whitelist = ['http://localhost:3001']
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(morgan('combined'));
app.use(cors(corsOptions))
app.use(bodyParser.json());
app.get("/cool", (req, res) => {
    res.json("hi there");
});
app.get("/", (req, res) => {
    res.send(db.users);
});
app.post("/signin", signin.handleSignin(db, bcrypt));
app.post("/register", (req, res) => {
    console.log("register...")
    register.handleRegister(req, res, db, bcrypt);
});
app.get("/profile/:id", (req, res) => {
    profile.handleProfileGet(req, res, db);
});
app.put("/image", (req, res) => {
    image.handleImage(req, res, db);
});
app.post("/imageurl", (req, res) => {
    image.handleApiCall(req, res);
});

app.listen(3000, () => {
    console.log(`app is running on port ${3000}`);
});
