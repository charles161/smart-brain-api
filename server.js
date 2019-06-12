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
    connection: {
        host: process.env.POSTGRES_HOST,
        database: process.env.POSTGRES_DB,
        username: process.env.POSTGRES_USERNAME,
        password: process.env.POSTGRES_PASSWORD
    }
});

console.log("host", process.env.POSTGRES_HOST);
console.log("db", process.env.POSTGRES_DB);

console.log("user", process.env.POSTGRES_USERNAME);

console.log("password", process.env.POSTGRES_PASSWORD);

const app = express();

app.use(morgan("combined"));
app.use(cors());
app.use(bodyParser.json());
app.get("/cool", (req, res) => {
    res.json("hi there");
});
app.get("/", (req, res) => {
    res.send(db.users);
});
app.post("/signin", signin.handleSignin(db, bcrypt));
app.post("/register", (req, res) => {
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
