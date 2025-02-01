const express = require("express");
const router = express.Router();
const Email = require("../globalVariables/Email");
const MovieList = require("../models/movielistModel");

module.exports = () => {
    router.post("/:imdbID/:title/:year", async (req, res) => {
        try {
            const imdbID = req.params.imdbID;
            const title = req.params.title;
            const year = req.params.year;    
            const email = Email.getEmail();
    
            if (!email) {
                return res.redirect("/login?message=No%20login%20found");
            }
    
            const existingMovie = await MovieList.findOne({ imdbid: imdbID, email: email });
    
            if (existingMovie) {
                return res.redirect("/items");
            }

            const newMovie = new MovieList({
                imdbid: imdbID,
                title: title,
                yearofrelease: year,
                email: email
            });

            await newMovie.save();
    
            res.redirect("/items");
        } catch (error) {
            console.error("Error adding movie:", error);
            res.status(500).send("Error adding movie");
        }
    });

    return router;
};
