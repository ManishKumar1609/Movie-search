const express = require("express");
const router = express.Router();
const Email = require("../globalVariables/Email");
const MovieList = require("../models/movielistModel");

module.exports = () => {
    router.post("/:imdbID", async (req, res) => {
        const email = Email.getEmail();
        const id = req.params.imdbID;

        try {
            await MovieList.findOneAndDelete({ imdbid: id, email: email });
            res.redirect("/items");
        } catch (error) {
            console.error("Error deleting movie:", error);
            res.status(500).send("Internal Server Error");
        }
    });

    return router;
};
