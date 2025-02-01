const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/:imdbID", async (req, res) => {
    var imdbID = req.params.imdbID;

    const omdbApiKey = process.env.OMDB_API_KEY;
    const URL = `https://www.omdbapi.com/?i=${imdbID}&apikey=${omdbApiKey}&plot=full`;

    try {
        const response = await axios.get(URL);
        const data = await response.data;
        res.render("single", { data: data });
    } catch (error) {
        console.error('Error fetching data from OMDB API:', error);
        res.redirect("/");
    }
});

module.exports = router;