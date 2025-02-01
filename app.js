const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const axios = require("axios");
require('dotenv').config();

const signupRouter = require("./routes/signup");
const loginRouter = require("./routes/login");
const singleSearchRouter = require("./routes/singleSearch");
const wtchListRouter = require("./routes/wtchList");
const itemsRouter = require("./routes/items");
const aboutRouter = require("./routes/about");
const LogOutRouter = require("./routes/logout");
const deleteRouter = require("./routes/delete");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

const mongoUri = process.env.MONGO_URI;

mongoose.connect(mongoUri)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("search");
});

app.post("/", async (req, res) => {
    try {
        const searchTerm = req.body.title;
        const omdbApiKey = process.env.OMDB_API_KEY;
        const omdbUrl = `http://www.omdbapi.com/?apikey=${omdbApiKey}&s=${searchTerm}`;

        const response = await axios.get(omdbUrl);

        const movies = response.data;
        res.render("home", { data: movies });
    } catch (error) {
        console.error("Error fetching data from OMDB:", error);
        res.render("error", { message: "Error fetching data from OMDB API" });
    }
});

app.use("/signup", signupRouter());
app.use("/login", loginRouter());
app.use("/singleSearch", singleSearchRouter);
app.use("/wtchList", wtchListRouter());
app.use("/items", itemsRouter());
app.use("/about", aboutRouter);
app.use("/logout", LogOutRouter);
app.use("/delete", deleteRouter());

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server active at port : ${port}`);
});