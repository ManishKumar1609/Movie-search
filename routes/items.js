const express = require("express");
const router = express.Router();
const Email = require("../globalVariables/Email");
const MovieList = require("../models/movielistModel");

module.exports = () => {
    router.get("/", async (req, res) => {
        let email = Email.getEmail();
        try {
            if (email !== "") {
                const data = await MovieList.find({ email: email });
                res.render("./Auth/YourItems", { data: data });
            } else {
                res.redirect("/login?message=No%20login%20found");
            }
        } catch (error) {
            console.error("Error displaying watchlist:", error);
            res.status(500).send("Internal Server Error");
        }
    });

    return router;
};
